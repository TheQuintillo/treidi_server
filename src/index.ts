import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import indexRouter from "./routes/index.route";
import authGoogle from "./routes/auth/authGoogle.routes";
import authFacebook from "./routes/auth/authFacebook.routes";
import registerRouter from "./routes/register/register.route";
import passport from "passport";
import session from "./middlewares/session.middleware";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth-google", authGoogle);
app.use("/auth-facebook", authFacebook);
app.use("/register", registerRouter);
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
