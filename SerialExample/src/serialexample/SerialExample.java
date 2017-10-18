/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package serialexample;
import com.pi4j.io.serial.*;
import com.pi4j.util.Console;

import java.io.IOException;
import javax.json.Json;
import javax.json.JsonObject;

import com.pi4j.gpio.extension.ads.ADS1015GpioProvider;
import com.pi4j.gpio.extension.ads.ADS1015Pin;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinAnalogInput;
import com.pi4j.io.i2c.I2CBus;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;


public class SerialExample {

    public static void main(String args[]) throws InterruptedException, IOException, Exception {
        OnionPiGPIO gpio;
        try {
            gpio = new OnionPiGPIO(args);
            gpio.initialize();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}

class OnionPiGPIO {
    HttpPost httppost;
    volatile HttpClient  httpclient;
    Serial serialPort;
    GpioController gpio;
    ADS1015GpioProvider adsOne;
    ADS1015GpioProvider adsTwo;
    Console console;
    double avgCalibrateValue;
    String url;
    GpioPinAnalogInput[] analogInputs;
    Thread networkThread;

    OnionPiGPIO(String args[]) throws Exception {
        serialPort = SerialFactory.createInstance();
        gpio = GpioFactory.getInstance();
        console = new Console();
        adsOne = new ADS1015GpioProvider(I2CBus.BUS_1, ADS1015GpioProvider.ADS1015_ADDRESS_0x48);
        adsTwo = new ADS1015GpioProvider(I2CBus.BUS_1, ADS1015GpioProvider.ADS1015_ADDRESS_0x49);
        analogInputs = new GpioPinAnalogInput[]{
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A0, "ADS1-A0"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A1, "ADS1-A1"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A2, "ADS1-A2"),
            gpio.provisionAnalogInputPin(adsOne, ADS1015Pin.INPUT_A3, "ADS1-A3"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A0, "ADS2-A0"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A1, "ADS2-A1"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A2, "ADS2-A2"),
            gpio.provisionAnalogInputPin(adsTwo, ADS1015Pin.INPUT_A3, "ADS2-A3")
        };
        networkThread = new Thread() {
            public void run() {
                try {
                    while(true) {
                    HttpPost httppost = new HttpPost(url);
                    StringEntity postEntity = new StringEntity(getADSDATA().toString(), ContentType.APPLICATION_JSON);
                    httppost.setEntity(postEntity);
                    HttpResponse response = httpclient.execute(httppost);
                    System.out.println(response.getEntity().getContentLength());
                    httppost.releaseConnection();
                    Thread.sleep(300);
                    }
                } catch (Exception ex) {
                    Logger.getLogger(OnionPiGPIO.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        };
        httpclient = HttpClientBuilder.create().build();
        if (args.length > 0) {
            url = args[0];
        } else {
            url = "https://backend-cebula.run.aws-usw02-pr.ice.predix.io/predixService/";
        }
    }

    public void initialize() throws Exception {
        initializeADS();
        initializeSerial();
        sendADSData();
    }

    private void initializeSerial() {
        try {
            serialPort.open(getSerialConfig());
            try {
                serialPort.write((byte) 180);
                serialPort.write((byte) 0);
                serialPort.write((byte) 0);
                serialPort.write((byte) 32);
                serialPort.write((byte) 180);
                System.out.println("Drone started");
            } catch (IllegalStateException e) {
                e.printStackTrace();
            }
        } catch (Exception ex) {
            console.println(" ==>> SERIAL SETUP FAILED : " + ex.getMessage());
        }
        finally {
            try {
                serialPort.close();
            } catch (IOException ex) {
                Logger.getLogger(OnionPiGPIO.class.getName()).log(Level.SEVERE, null, ex);
            }
    }
    }
    
    private SerialConfig getSerialConfig() throws IOException, InterruptedException {
        return new SerialConfig()
                .device(SerialPort.getDefaultPort())
                .baud(Baud._9600)
                .dataBits(DataBits._8)
                .parity(Parity.NONE)
                .stopBits(StopBits._1)
                .flowControl(FlowControl.NONE);
    }

    public void initializeADS() throws Exception {
        calibrateInput();
    }

    private void calibrateInput() throws Exception {
        boolean areCorrect = false;
        while (!areCorrect) {
            double sum = 0, i = 1;
            areCorrect = true;
            for (GpioPinAnalogInput input : analogInputs) {
                if (input.getValue() < 0) {
                    areCorrect = false;
                }
                sum += input.getValue() * 8 / i;
                i++;
            }
            avgCalibrateValue = sum / 8;
        }
        System.out.println("Calibrated!");
    }

    private void sendADSData() throws Exception {
            startADSDataSend();
    }
    
    private void startADSDataSend() {
        networkThread.start();
    }

    private JsonObject  getADSDATA() {
        return Json.createObjectBuilder()
                .add("X", convertToRange(analogInputs[0].getValue(), 4096))
                .add("Y", convertToRange(analogInputs[1].getValue(), 4096))
                .add("Altitude", convertToRange(analogInputs[2].getValue(), 512))
                .add("Height", convertToRange(analogInputs[3].getValue(), 512))
                .add("Battery", convertToRange(analogInputs[4].getValue(), 100))
                .add("Azimuth", convertToRange(analogInputs[5].getValue(), 360))
                .add("Pitch", convertToRange(analogInputs[6].getValue(), 180, 90))
                .add("Roll", convertToRange(analogInputs[7].getValue(), 360, 180))
                .build();
    }

    private double convertToRange(double value, int range) {
        return (value / avgCalibrateValue) * range;
    }

    private double convertToRange(double value, int range, int offset) {
        return value / avgCalibrateValue * range - offset;
    }
}