import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Events } from "./@types";

type Props = {
  data: Events[];
  dkey: string;
  name: string;
  theme: string;
  type?: "value" | "percent";
};

const LineGraph = ({ data, dkey, name, theme, type }: Props) => {
  const themes: any = {
    light: {
      backgroundColor: "#ffffff",
      borderColor: "#b2bec3",
      stroke: "#2d3436",
    },
    dark: {
      backgroundColor: "#2d3436",
      borderColor: "#b2bec3",
      stroke: "#ffffff",
    },
  };

  const formatValue = (value: ValueType, valType: typeof type): string => {
    if (valType === "percent") {
      return value.toLocaleString("en-US", { style: "percent" });
    } else {
      return (
        value
          .toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })
          .replaceAll(",", " ") + " ms"
      );
    }
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
        <XAxis domain={[0, 60]} tickCount={60} hide />
        <YAxis hide />
        <CartesianGrid vertical={false} />
        <Tooltip
          labelStyle={{ display: "none" }}
          wrapperStyle={{ outline: "none" }}
          contentStyle={themes[theme]}
          cursor={false}
          formatter={(value) => formatValue(value, type)}
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
