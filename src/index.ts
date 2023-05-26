import express from "express";
import { PORT } from "./config/env";
import indexRouter from "./routes/index.route";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
