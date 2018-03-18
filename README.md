# Draw <--> Sound <--> Live

## About

Sound><Art is an application that allows users to either perform, or watch the performance of, a user who draws music and sound. That is, they create a sound performance by doing art and drawing with their mouse. Our digital space is inspired by Soundspace at Durham Science Museum (https://www.lifeandscience.org/soundspace), which merges movement, sound, and visual art. 

The app provides an endless participatory experience in which performers interact with the canvas DOM. They have a canvas on the screen--an instrument--which allows them to manipulate a sound track and generate sound based on input events (eg. mouse location, direction, velocity) which is both seen and heard by viewers. Each movement is drawn and viewable. The underlying rules are not explicit to the users. Simply, they are sketching “music”.

Viewers can rate and comment on the performance. Performers stats (eg. # of performances, ratings) are displayed.

## MERN Basic Components

Our application starts off with the basic MERN components (MongoDB, Express, React and Node).

References: 
* [MongoDB] - https://www.mongodb.com
* [Express] - https://expressjs.com
* [React] - https://reactjs.org/
* [Node.js] - https://nodejs.org/en/

### Authentication

Our application just needed a basic authentication component as we're primarily interested in obtaining a user's name and a unique id for tracking the user's participation on our app.  We decided to accomplish this using Passport.js, Passport-Google-Oauth and React-Google-Login.

#### Passport.js
* [Passport.js] - http://www.passportjs.org/
* [Passport-Google-Oauth] - https://www.npmjs.com/package/passport-google-oauth

#### Google-React-Login
* [Google-React-Login] - https://www.npmjs.com/package/react-google-login


## UI Components

## Sound Components




## Demo the App

### Starting the app locally

Clone the GitHub Repo on your local machine.  Then complete the yarn install process which will install the dependencies.  After this, start your local MongoDB server and do a yarn start. 

Note:  You will need to include a .env file in your root directory with GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET variables which will need to be obtained from Google.  You will also need to specify in your Google Dev Dashboard the origin and callback routes from the application.
