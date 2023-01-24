import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "socket.io";
import { Kafka, logLevel } from "kafkajs";
import eventType from "./eventType.js";

const PORT = 5000 || parseInt(process.env.PORT);
const TOPICS = process.env.KAFKA_TOPICS.split(",");
const BROKERS = process.env.KAFKA_BROKER.split(",");

const BROKER =
  process.env.NODE_ENV === "production" ? BROKERS : ["localhost:9092"];

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: BROKER,
  clinetID: "monitoring",
});

const consumer = kafka.consumer({ groupId: "kafka" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: TOPICS, fromBeginning: true });
  await consumer.run({
    eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      isRunning,
      isStale,
    }) => {
      const events = batch.messages.map((message) => {
        return eventType.fromBuffer(message.value);
      });

      callSockets(io, events);
      await heartbeat();
    },
    /* eachMessage: async ({ topic, partition, message }) => {
      const event = eventType.fromBuffer(message.value);
      callSockets(io, JSON.stringify(event));
    }, */
  });
};

run().catch((error) => {
  console.log("\x1b[31m%s\x1b[0m", "New consumer error!");
  console.error(error);
});

io.on("connection", (socket) => {
  console.log("\x1b[36m%s\x1b[0m", `Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("\x1b[36m%s\x1b[0m", `Client: ${socket.id} - disconnected`);
  });
});

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

const callSockets = (io, message) => {
  console.log(message);
  io.sockets.emit("update", message);
};
