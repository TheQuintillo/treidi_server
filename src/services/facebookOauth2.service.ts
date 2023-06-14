import passport from "passport";
import { UserFacebookTreidi } from "../entities/Users/UserFacebook.entities";
import { UserPrisma } from "../models/Users/User.model";
import { UserFacebookPrisma } from "../models/Users/UserFacebook.model";

const FacebookStrategy = require("passport-facebook");

const userFacebook = new UserFacebookPrisma();
const user = new UserPrisma();

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
      const findUserFacebook = await userFacebook.findUserById(profile.id);
      const findUser = await user.findUserIdFacebook(profile.id);
      console.log(profile);
      console.log(profile);
      if (findUserFacebook) {
        if (findUser) {
          await user.updateUserFacebook(profile.id, {
            provider: profile.provider,
          });
          return cb(null, findUser);
        }
        return cb(null, findUserFacebook);
      } else {
        const User = new UserFacebookTreidi(
          profile.id,
          profile.name.givenName + " " + profile.name.familyName,
          profile.email,
          accessToken
        );

        const createUserNew = await user.createUser({
          name: profile.name.givenName,
          apellidos: profile.name.familyName,
          idFacebook: profile.id,
          provider: profile.provider,
        });
        const createUser = await userFacebook.createUser(User);

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
