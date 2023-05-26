import session from "express-session";
import { SESSION } from "../config/env";

session({
  secret: SESSION ?? "SECRET_SESSION",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});

export default session;
