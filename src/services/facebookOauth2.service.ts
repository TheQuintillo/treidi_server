import passport from "passport";
import { UserFacebookTreidi } from "../entities/Users/UserFacebook.entities";
import { UserFacebookPrisma } from "../models/Users/UserFacebook.model";

const FacebookStrategy = require("passport-facebook");
const userFacebook = new UserFacebookPrisma();

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
      const userFacebookCreate = new UserFacebookTreidi(
        profile.id,
        accessToken,
        profile.provider
      );
      const findUser = await userFacebook.findUser(userFacebookCreate);
      if (findUser) {
        const updateToken = await userFacebook.updateUser(
          profile.id,
          accessToken
        );
        return cb(null, updateToken);
      } else {
        return cb(null, userFacebookCreate);
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
