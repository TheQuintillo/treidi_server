import passport from "passport";
import { UserGoogleTreidi } from "../entities/Users/UserGoogle.entities";
import { UserGooglePrisma } from "../models/Users/UserGoogle.model";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

const userGooglePrisma = new UserGooglePrisma();

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
      const userGoogle = new UserGoogleTreidi(
        profile.id,
        accessToken,
        profile.provider
      );
      const findUser = await userGooglePrisma.findUser(userGoogle);
      if (findUser) {
        const updateToken = await userGooglePrisma.updateUser(
          profile.id,
          accessToken
        );
        return cb(null, updateToken);
      } else {
        return cb(null, userGoogle);
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
