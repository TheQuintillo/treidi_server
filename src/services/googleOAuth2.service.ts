import passport from "passport";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URL_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      // When models prisma UserGoogle will be created settings this section with new User
      /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });*/
    }
  )
);
