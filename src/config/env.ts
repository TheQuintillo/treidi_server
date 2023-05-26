import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config();
dotenvExpand.expand(env);

export const PORT = process.env.PORT;
export const SESSION = process.env.SESSION;
