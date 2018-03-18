const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// Google Oauth
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/DSLUsers"
);

app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


http.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

//Global variable sent to each user when they connect
let performerInfo = null;
let performerSocketID = null;

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg);
  });

  //start of performance
  socket.on('start', (performer) => {
    performerSocketID = socket.id;
    performerInfo = performer;
    io.emit('start', performer);
  });

  //end of performance
  socket.on('stop', () => {
    performerInfo = null;
    performerSocketID = null;
    io.emit('stop');
  });

  //initial check to see user has entered mid-performance
  socket.on('performance check', () => {
    socket.emit('performance check', performerInfo);
  })

  socket.on('disconnectTest', (msg) => {
    console.log("someone left....")
    console.log(msg)
  })

  //up vote
  socket.on('up', () => {
    io.emit('up');
  });

  //down vote
  socket.on('down', () => {
    io.emit('down');
  });

  //performer movement and action
  socket.on('performance', (msg) => {
    socket.broadcast.emit('performance', msg);
  });


  console.log("Number of clients connected: " + io.engine.clientsCount);

  io.sockets.emit('clientsCount', (io.engine.clientsCount));

  socket.on('getInitialClientsCount', () => {
    io.sockets.emit('initialClientClount', (io.engine.clientsCount));
  })

  socket.on('disconnect', () => {
    io.sockets.emit('clientsCount', (io.engine.clientsCount));
    console.log('Socket disconnected');
    if (performerSocketID === socket.id) {
      console.log("the performer has quit!");
      performerInfo = null;
      performerSocketID = null;
      io.emit('stop');
    }
  })

  // calls clients to query all unique client connections in the "/" namespace
  // console.logs array with unique client identifiers
  // io.clients((error, clients) => {
  //   if (error) throw error;
  //   console.log(clients);
  // });
});

// io.on('connection', (socket) => {

//   console.log('dk user connected');

//   const users = io.clients((error, clients) => {
//   // io.clients((error, clients) => {
//       if (error) throw error;
//     console.log(clients);
//       socket.on('clients', () => {
//         io.emit('clients');
//       });
//     });
//   console.log(io.engine.clientsCount);
// });

