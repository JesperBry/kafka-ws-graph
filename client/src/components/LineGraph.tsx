import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip } from "recharts";
import { Events } from "./@types";

type Props = {
  data: Array<Events>;
  dkey: string;
  name: string;
};

const LineGraph = ({ data, dkey, name }: Props) => {
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
          cursor={false}
        />
        <Legend verticalAlign="bottom" height={5} />
        <Line
          type="linear"
          isAnimationActive={false}
          dataKey={dkey}
          name={name}
          stroke="#2c3e50"
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default LineGraph;
