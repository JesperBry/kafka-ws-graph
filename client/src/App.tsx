import React, { useEffect } from "react";
import { useQueueState } from "./hooks/useQueueState";
import { io } from "socket.io-client";

import "./App.css";
import LineGraph from "./components/LineGraph";

const socket = io("http://localhost:5000");

function App() {
  const [list, controls] = useQueueState<any>([]);
  const { enqueue, peek, dequeue, length } = controls;

  useEffect(() => {
    function addToQueue(data: any) {
      enqueue(data);
    }

    socket.on("update", (data) => {
      if (length === 60) {
        dequeue();
      } else {
        addToQueue(JSON.parse(data));
      }
    });
  }, [dequeue, enqueue, length]);

  return (
    <div className="App">
      <LineGraph data={list} name="CPU usage" dkey="cpu" />
      <LineGraph data={list} name="Memory usage" dkey="memory" />
      <LineGraph data={list} name="Process uptime" dkey="uptime" />
    </div>
  );
}

export default App;
