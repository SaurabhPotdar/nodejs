import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

export default {
    port: process.env.PORT
}