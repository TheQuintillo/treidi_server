import express from "express";
import passport from "passport";

require("../../services/googleOAuth2.service");

const app = express();

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/user",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.json({ user: req.user });
  }
);

export default app;
