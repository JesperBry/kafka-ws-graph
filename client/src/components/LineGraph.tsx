import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip } from "recharts";
import { Events } from "./@types";

type Props = {
  data: Events[];
  dkey: string;
  name: string;
  theme: string;
};

const LineGraph = ({ data, dkey, name, theme }: Props) => {
  const themes: any = {
    light: {
      backgroundColor: "#ffffff",
      stroke: "#2d3436",
    },
    dark: {
      backgroundColor: "#2d3436",
      borderColor: "#b2bec3",
      stroke: "#ffffff",
    },
  };

  return (
    <div className="Card">
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: 5,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <Tooltip
          labelStyle={{ display: "none" }}
          wrapperStyle={{ outline: "none" }}
          contentStyle={themes[theme]}
          cursor={false}
        />
        <Legend verticalAlign="bottom" height={5} />
        <Line
          type="linear"
          isAnimationActive={false}
          dataKey={dkey}
          name={name}
          stroke={themes[theme].stroke}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default LineGraph;
