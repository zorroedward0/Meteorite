import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import type { FallGroup } from "@/api/types";

const TOOLTIP_STYLE = {
  background: "#0f172a",
  border: "1px solid rgba(100, 116, 139, 0.4)",
  borderRadius: 8,
  color: "#f8fafc",
};

const COLORS: Record<string, string> = {
  Fell: "#e08e55",
  Found: "#6bb4d8",
};

export default function FallChart({ data }: { data: FallGroup[] }) {
  const series = data.map((item) => ({
    ...item,
    label: item.fall === "Fell" ? "Cayó" : "Encontrado",
  }));
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={series}
          margin={{ top: 24, right: 8, bottom: 0, left: 8 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#94a3b8" }}
            tickLine={{ stroke: "#94a3b8" }}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
          />
          <Bar dataKey="quantity" name="Hallazgos" radius={[6, 6, 0, 0]}>
            {series.map((item) => (
              <Cell key={item.fall} fill={COLORS[item.fall] ?? "#64748b"} />
            ))}
            <LabelList
              dataKey="quantity"
              position="inside"
              fill="#f8fafc"
              fontSize={11}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
