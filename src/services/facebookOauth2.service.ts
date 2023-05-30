import passport from "passport";
import { UserFacebookTreidi } from "../entities/Users/UserFacebook.entities";
import { UserFacebookPrisma } from "../models/Users/UserFacebook.model";

const FacebookStrategy = require("passport-facebook");

const user = new UserFacebookPrisma();
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_URL_CALLBACK,
      profileFields: ["id", "emails", "name"],
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      const findUser = await user.findUserById(profile.id);

      if (findUser) {
        return cb(null, findUser);
      } else {
        const User = new UserFacebookTreidi(
          profile.id,
          profile.name.givenName + " " + profile.name.familyName,
          profile.email,
          accessToken
        );
        const createUser = await user.createUser(User);

        return cb(null, createUser);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("SERIALIZING", user);
  done(null, user);
});
passport.deserializeUser(async (user: UserFacebookTreidi | null, done) => {
  console.log("Deserializing", user);
  done(null, user);
});
