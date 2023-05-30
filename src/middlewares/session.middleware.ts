import session from "express-session";
import { SESSION } from "../config/env";

export default session({
  secret: SESSION || "prueba",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});
