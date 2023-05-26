import passport from "passport";
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_URL_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      //ADDED new
      // When models prisma UserFacebook will be created settings this section with new User
      /*
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });*/
    }
  )
);
