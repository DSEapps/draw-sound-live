const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            // check if user already exists in our own db
            User.findById({ id: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have this user
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    new User({
                        id: profile.id,
                        name: profile.displayName
                    }).save().then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    });
                }
            });
        })
    );
};