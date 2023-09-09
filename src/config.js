// config.js
import configDev from "./utils/config.dev";
import configProd from "./utils/config.prod";

const isDevelopment = process.env.NODE_ENV === "development";

const config = isDevelopment ? configDev : configProd;

export default config;
