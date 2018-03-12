const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/DSLUsers"
  // {
  //   useMongoClient: true
  // }
);

// Add routes, both API and view
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


http.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg);
  });

  socket.on('start', (performer) => {
    io.emit('start', performer);
  });

  socket.on('up', () => {
    io.emit('up');
  });

  socket.on('down', () => {
    io.emit('down');
  });

  socket.on('performance', (msg) => {
    socket.broadcast.emit('performance', msg);
  }); 

  // calls clients to query all unique client connections in the "/" namespace
  // console.logs array with unique client identifiers
  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  });


});




