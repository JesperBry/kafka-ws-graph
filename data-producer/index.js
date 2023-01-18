import * as dotenv from "dotenv";
dotenv.config();

import Kafka from "node-rdkafka";
import eventType from "./eventType.js";
import os from "os-utils";

const streem = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": process.env.KAFKA_BROKER,
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
  const result = streem.write(eventType.toBuffer(event));
  if (result) {
    console.log("Event sucess");
  } else {
    console.log("Event failed!");
  }
};

setInterval(() => {
  os.cpuUsage((cpuPercent) => {
    sendEvent(cpuPercent);
  });
}, 2000);
