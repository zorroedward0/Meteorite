import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearGroup } from "@/api/types";

const TOOLTIP_STYLE = {
  background: "#0f172a",
  border: "1px solid rgba(100, 116, 139, 0.4)",
  borderRadius: 8,
  color: "#f8fafc",
};

export default function AreaChart({ data }: { data: YearGroup[] }) {
  const series = data
    .filter((item) => item.year !== null && item.year >= 1950)
    .slice()
    .reverse();
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={series}
          margin={{ top: 10, right: 12, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.18)"
          />
          <XAxis
            dataKey="year"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#94a3b8" }}
            tickLine={{ stroke: "#94a3b8" }}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={34}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area
            type="monotone"
            dataKey="quantity"
            name="Hallazgos"
            stroke="#94a3b8"
            strokeWidth={2}
            fill="url(#area-fill)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
