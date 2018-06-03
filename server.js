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
require('dotenv').config();

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

  console.log("User has connected");
  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg);
    console.log("Chat Message: " + msg);
  });

  //start of performance
  socket.on('start', (performer) => {
    performerSocketID = socket.id;
    performerInfo = performer;
    io.emit('start', performer);
    console.log("Performance Started, performer: " + performer);
  });

  //end of performance
  socket.on('stop', () => {
    performerInfo = null;
    performerSocketID = null;
    io.emit('stop');
    console.log("Performance Ended");
  });

  //initial check to see user has entered mid-performance
  socket.on('performance check', () => {
    socket.emit('performance check', performerInfo);
  })

  //up vote
  socket.on('up', () => {
    io.emit('up');
    console.log("Performer has been up voted");
  });

  //down vote
  socket.on('down', () => {
    io.emit('down');
    console.log("Performer has been down voted");
  });

  //performer movement and action
  socket.on('performance', (msg) => {
    socket.broadcast.emit('performance', msg);
  });

  io.sockets.emit('clientsCount', (io.engine.clientsCount));

  socket.on('getInitialClientsCount', () => {
    io.sockets.emit('initialClientClount', (io.engine.clientsCount));
  })

  socket.on('disconnect', () => {
    io.sockets.emit('clientsCount', (io.engine.clientsCount));
    console.log("User has disconnected");
    if (performerSocketID === socket.id) {
      performerInfo = null;
      performerSocketID = null;
      io.emit('stop');
    }
  })
});