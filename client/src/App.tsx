import React, { useEffect } from "react";
import { useQueueState } from "./hooks/useQueueState";
import { io } from "socket.io-client";
import LineGraph from "./components/LineGraph";
import { Events } from "./components/@types";
import ThemeIcon from "./assets/themeIcon";

import "./App.css";
import usePersistedState from "./hooks/usePersistedState";

const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || "";

const socket = io(SOCKET_URL);

function App() {
  const [list, controls] = useQueueState<Events>([]);
  const { enqueue, peek, dequeue, length } = controls;
  const [theme, setTheme] = usePersistedState<"light" | "dark">(
    "theme",
    "light"
  );

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    function addToQueue(data: Events[]) {
      enqueue(data);
    }

    socket.on("update", (data: Events[]) => {
      if (length >= 60) {
        console.log(length);
        dequeue();
      } else {
        addToQueue(data);
      }
    });
  }, [dequeue, enqueue, length]);

  return (
    <div className={`App ${theme}`}>
      <div
        className="icon-button"
        onClick={() => {
          toggleTheme();
        }}
      >
        <ThemeIcon theme={theme} />
      </div>
      <div className="graph-wrapper">
        <LineGraph
          data={list}
          theme={theme}
          name="CPU usage"
          dkey="cpu"
          type="percent"
        />
        <LineGraph
          data={list}
          theme={theme}
          name="Memory usage"
          dkey="memory"
          type="percent"
        />
        <LineGraph
          data={list}
          theme={theme}
          name="Process uptime"
          dkey="uptime"
          type="value"
        />
      </div>
    </div>
  );
}

export default App;
