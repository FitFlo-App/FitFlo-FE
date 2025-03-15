import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";

interface ChartProps {
  type: "line" | "bar" | "pie" | "radar" | "radialBar";
  data: any[];
  width?: number | string;
  height?: number | string;
  colors?: string[];
  dataKey?: string;
  nameKey?: string;
  xAxisDataKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  children?: React.ReactNode;
}

const defaultColors = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // olive
  "#17becf", // teal
];

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  width = "100%",
  height = 300,
  colors = defaultColors,
  dataKey = "value",
  nameKey = "name",
  xAxisDataKey = "name",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className = "",
  title,
  subtitle,
  stacked = false,
  children,
}) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children || (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children ||
              Object.keys(data[0] || {})
                .filter(
                  (key) =>
                    key !== xAxisDataKey &&
                    key !== nameKey &&
                    typeof data[0][key] === "number"
                )
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[index % colors.length]}
                    stackId={stacked ? "a" : undefined}
                  />
                ))}
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children || (
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey={nameKey}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            )}
          </PieChart>
        );
      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius={90} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={nameKey} />
            <PolarRadiusAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children || (
              <Radar
                name={dataKey}
                dataKey={dataKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
            )}
          </RadarChart>
        );
      case "radialBar":
        return (
          <RadialBarChart
            width={Number(width)}
            height={Number(height)}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey={dataKey}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </RadialBar>
            {showTooltip && <Tooltip />}
            {showLegend && (
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            )}
          </RadialBarChart>
        );
      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold">{title}</h3>}
      {subtitle && (
        <p className="chart-subtitle text-sm text-gray-500">{subtitle}</p>
      )}
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
