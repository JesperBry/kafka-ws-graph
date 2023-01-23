import * as dotenv from "dotenv";
dotenv.config();

import Kafka from "node-rdkafka";
import eventType from "./eventType.js";
import os from "os-utils";

const BROKER =
  process.env.NODE_ENV === "production"
    ? process.env.KAFKA_BROKER
    : "localhost:9092";

const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": BROKER,
  },
  {},
  { topic: process.env.KAFKA_TOPICS }
);

const sendEvent = (cpu) => {
  const event = {
    cpu: cpu,
    memory: os.freememPercentage(),
    uptime: os.processUptime(),
  };
  const result = stream.write(eventType.toBuffer(event));
  if (result) {
    console.log("Event sucess");
  } else {
    console.log("\x1b[31m%s\x1b[0m", "Event failed!");
  }
};

stream.on("error", function (err) {
  console.log("\x1b[31m%s\x1b[0m", "Error in our kafka stream!");
  console.error(err);
});

setInterval(() => {
  os.cpuUsage((cpuPercent) => {
    sendEvent(cpuPercent);
  });
}, 2000);
