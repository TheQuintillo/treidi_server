import passport from "passport";
import { UserGoogleTreidi } from "../entities/Users/UserGoogle.entities";
import { UserGooglePrisma } from "../models/Users/UserGoogle.model";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

const user = new UserGooglePrisma();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URL_CALLBACK,
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      const findUser = await user.findUser(profile.emails[0].value);

      if (findUser) {
        return cb(null, findUser);
      } else {
        const User = new UserGoogleTreidi(
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          profile.photos[0].value,
          accessToken
        );
        const createUser = await user.createUser(User);

        return cb(null, createUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing", user);
  done(null, user);
});
passport.deserializeUser(async (user: UserGoogleTreidi | null, done) => {
  console.log("Deserializing", user);
  done(null, user);
});
