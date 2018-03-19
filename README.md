# EDC Industrial IoT Hackathon 2017 project
My team project made on _[EDC Industrial IoT Hackathon 2017](http://www.edc.pl/hackathon)_ __(we was on third place!)__.

The challenge was to create a server app and prepare electronics on Raspberry Pi for receive analog signals from another RPi (prepared as __drone simulator__) and create application for data visualisation from this "mock" drone.

We used __Java__ to make server app on RPi, __[Express](https://expressjs.com/)__ for RESTful API and __[React](https://reactjs.org/)__ to make web application.

I made the last part of this project - web application in React :-) This was my first app in React framework.

Created by __[Michał Milanowski](https://www.linkedin.com/in/michalmilanowski/)__, __[Tomasz Szarek](https://www.linkedin.com/in/tomasz-szarek-798373132/)__ and __[Sylwester Denko](https://www.linkedin.com/in/sylwester-denko-35aa59113/)__.

Check this on __(https://warmaxis.github.io/EDC_Industrial_IoT_Hackathon_2017_project/)__  
(back-end and API don't work, but you can use _React plugin_ for browser to change the app state and see what happens)

*More info and photos also on [Facebook hackathon event](https://www.facebook.com/events/1443940905659841/)

## Functions:

### Java server on RPi
* converts analog signals to digital signals
* sends data to _Express_ web server

### _Express_ web server
* receives data from RPi
* sends data to web application in _JSON_

### _React_ web application
* makes data visualisations in simple UI dashboard
* updates data and UI every one second

## How to start? (only _React_ web app) 

1. Install dependencies (you can also use [yarn](https://yarnpkg.com/))
```bash
$ npm install
```

2. Run scripts (app was based on [create-react-app](https://github.com/facebook/create-react-app), more info there)
```bash
$ npm start
```

## Used technologies in this project:

* __[Raspberry Pi 3](https://www.raspberrypi.org/)__
* __Electronics__
* __Java__
* __[Express](https://expressjs.com/)__
* __[React](https://reactjs.org/)__
* __NodeJS__
* __JavaScript__
* __RESTful API__
* __HTML__
* __CSS__
* __[Bootstrap 4](https://getbootstrap.com/)__
