import express from 'express';
import config from "./config"

const app = express();

console.log(config.port);

app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`);
});