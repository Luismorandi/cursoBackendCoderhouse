import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./src/logger/error.log" },
   
    },
  
  categories: {
    default: {
      appenders: ["fileAppender"],
      level: "trace",
    },
   
  },
});

let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = log4js.getLogger("prod");
} else {
  logger = log4js.getLogger();
}

export default logger;
