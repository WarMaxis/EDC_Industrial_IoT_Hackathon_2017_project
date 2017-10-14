/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package serialexample;
import com.pi4j.io.serial.*;
import com.pi4j.util.CommandArgumentParser;
import com.pi4j.util.Console;

import java.io.IOException;
import java.util.Date;
import java.text.DecimalFormat;
import javax.json.Json;
import javax.json.JsonObject;

import com.pi4j.gpio.extension.ads.ADS1015GpioProvider;
import com.pi4j.gpio.extension.ads.ADS1015Pin;
import com.pi4j.gpio.extension.ads.ADS1x15GpioProvider.ProgrammableGainAmplifierValue;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinAnalogInput;
import com.pi4j.io.gpio.event.GpioPinAnalogValueChangeEvent;
import com.pi4j.io.gpio.event.GpioPinListenerAnalog;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CFactory.UnsupportedBusNumberException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * This example code demonstrates how to perform serial communications using the Raspberry Pi.
 *
 * @author Robert Savage
 */
public class SerialExample {

    public static void main(String args[]) throws InterruptedException, IOException, Exception {
        GPIO gpio;
        try {
            gpio = new GPIO();
            gpio.initialize();
        } catch (Exception e) {
            System.out.println("Fail init!");
        }
    }
}

class GPIO {
    Serial serial;
    GpioController gpio;
    ADS1015GpioProvider adsOne;
    ADS1015GpioProvider adsTwo;
    Console console;
    double maxValue;
    GpioPinAnalogInput[] myInputs;

    GPIO() throws Exception {
        serial = SerialFactory.createInstance();
        gpio = GpioFactory.getInstance();
        console = new Console();
        adsOne = new ADS1015GpioProvider(I2CBus.BUS_1, ADS1015GpioProvider.ADS1015_ADDRESS_0x48);
        adsTwo = new ADS1015GpioProvider(I2CBus.BUS_1, ADS1015GpioProvider.ADS1015_ADDRESS_0x49);
        myInputs = new GpioPinAnalogInput[]{
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A0, "ADS1-A0"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A1, "ADS1-A1"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A2, "ADS1-A2"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A3, "ADS1-A3"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A0, "ADS2-A0"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A1, "ADS2-A1"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A2, "ADS2-A2"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A3, "ADS2-A3")
        };
    }

    public void initialize() throws Exception {
        initializeADS();
        initializeSerial();
        getADSData();
    }

    private void initializeSerial() throws Exception {
        //serial.addListener(new SerialDataEventListener() {
        //    @Override
        //    public void dataReceived(SerialDataEvent event) {
        //        //try {
        //        //    console.println(event.getHexByteString());
        //        //} catch (IOException e) {
        //        //    e.printStackTrace();
        //        //}
        //    }
        //});

        try {
            SerialConfig config = new SerialConfig();
            config.device(SerialPort.getDefaultPort())
                    .baud(Baud._9600)
                    .dataBits(DataBits._8)
                    .parity(Parity.NONE)
                    .stopBits(StopBits._1)
                    .flowControl(FlowControl.NONE);
            serial.open(config);

            try {
                serial.write((byte) 180);
                serial.write((byte) 0);
                serial.write((byte) 0);
                serial.write((byte) 32);
                serial.write((byte) 180);
                System.out.println("Drone started");
            } catch (IllegalStateException e) {
                e.printStackTrace();
            }

        } catch (IOException ex) {
            console.println(" ==>> SERIAL SETUP FAILED : " + ex.getMessage());
            return;
        }
        Thread.sleep(10000);
    }

    public void initializeADS() throws Exception {
        calibrateInput();
    }

    private void calibrateInput() throws Exception {
        boolean areCorrect = false;
        while (!areCorrect) {
            System.out.println("Calibrating");
            double sum = 0, i = 1;
            areCorrect = true;
            for (GpioPinAnalogInput input : myInputs) {
                if (input.getValue() < 0) {
                    areCorrect = false;
                }
                sum += input.getValue() * 8 / i;
                i++;
            }
            maxValue = sum / 8;
        }
    }

    private void getADSData() throws Exception {
        while (true) {
            HttpClient  httpclient = HttpClientBuilder.create().build();
            HttpPost httppost = new HttpPost("https://backend-cebula.run.aws-usw02-pr.ice.predix.io/predixService/");
            StringEntity postEntity = new StringEntity(createADSDataJSON().toString(), ContentType.APPLICATION_JSON);
            httppost.setEntity(postEntity);
            HttpResponse response = httpclient.execute(httppost);
            System.out.println(response.getEntity().getContentLength());
            httppost.releaseConnection();
            Thread.sleep(1000);
        }
    }

    private JsonObject  createADSDataJSON() {
        return Json.createObjectBuilder()
                .add("X", convertToRange(myInputs[0].getValue(), 4096))
                .add("Y", convertToRange(myInputs[1].getValue(), 4096))
                .add("Altitude", convertToRange(myInputs[2].getValue(), 512))
                .add("Height", convertToRange(myInputs[3].getValue(), 512))
                .add("Battery", convertToRange(myInputs[4].getValue(), 100))
                .add("Azimuth", convertToRange(myInputs[5].getValue(), 360))
                .add("Pitch", convertToRange(myInputs[6].getValue(), 180, 90))
                .add("Roll", convertToRange(myInputs[7].getValue(), 360, 180))
                .build();
    }

    private double convertToRange(double value, int range) {
        return (value / maxValue) * range;
    }

    private double convertToRange(double value, int range, int offset) {
        return value / maxValue * range - offset;
    }
}