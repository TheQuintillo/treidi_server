import express from "express";
import passport from "passport";
require("../../services/facebookOauth2.service");

const app = express();

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/user",
    failureRedirect: "/login",
    scope: ["user_location", "email", "profile"],
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({ user: req.user });
  }
);

export default app;
