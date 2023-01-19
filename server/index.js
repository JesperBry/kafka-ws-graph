import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "socket.io";
import Kafka from "node-rdkafka";
import eventType from "./eventType.js";

const port = 5000 || parseInt(process.env.PORT);
const topics = process.env.KAFKA_TOPICS.split(",");

const BROKER =
  process.env.NODE_ENV === "production"
    ? process.env.KAFKA_BROKER
    : "localhost:9092";

const app = express();

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

const consumer = Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": BROKER,
  },
  {}
);
consumer.connect();

io.on("connection", (socket) => {
  console.log("\x1b[36m%s\x1b[0m", `Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("\x1b[36m%s\x1b[0m", `Client: ${socket.id} - disconnected`);
  });
});

consumer
  .on("ready", () => {
    console.log("\x1b[32m%s\x1b[0m", "Consumer ready");
    consumer.subscribe(topics);
    consumer.consume();
  })
  .on("data", (data) => {
    const event = eventType.fromBuffer(data.value);
    callSockets(io, JSON.stringify(event));
    console.log(JSON.stringify(event));
  });

const callSockets = (io, message) => {
  io.sockets.emit("update", message);
};
