import passport from "passport";
import { UserGoogleTreidi } from "../entities/Users/UserGoogle.entities";
import { UserGooglePrisma } from "../models/Users/UserGoogle.model";
import { UserPrisma } from "../models/Users/User.model";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

const userGoogle = new UserGooglePrisma();
const user = new UserPrisma();

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
      const findUserGoogle = await userGoogle.findUser(profile.emails[0].value);
      const findUser = await user.findUserEmail(profile.emails[0].value);

      if (findUserGoogle || findUser) {
        if (findUser?.email) {
          await user.updateUser(findUser.email, {
            idGoogle: profile.id,
            provider: "google",
          });
          return cb(null, findUser);
        } else {
          const createUser = await user.createUser({
            name: profile.displayName,
            apellidos: profile.displayName,
            email: profile.emails[0].value,
            idGoogle: profile.id,
          });
          return cb(null, findUserGoogle);
        }
      } else {
        const User = new UserGoogleTreidi(
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          profile.photos[0].value,
          accessToken
        );

        const createUserNew = await user.createUser({
          name: profile.displayName,
          apellidos: profile.displayName,
          email: profile.emails[0].value,
          idGoogle: profile.id,
          provider: "google",
        });
        const createUser = await userGoogle.createUser(User);

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
