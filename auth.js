const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('./models');

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
            console.log("check for profile")
            db.User.findOne({ id: profile.id }).then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    db.User.create({
                        name: profile.name.givenName,
                        id: profile.id,
                        upClaps: 0,
                        downClaps: 0
                    }).then((user) => {
                        console.log(user);
                        return done(null, user);
                    })
                }
            });
        })
    );
};