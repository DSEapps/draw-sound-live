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

//Google OAuth with Passport Code
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://www.example.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
// End of Google OAuth additions

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

