import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { ClassGroup } from "@/api/types"

const TOOLTIP_STYLE = {
  background: "#0f172a",
  border: "1px solid rgba(100, 116, 139, 0.4)",
  borderRadius: 8,
  color: "#f8fafc",
}

function getBarColor(index: number) {
  if (index === 0) {
    return "#e08e55"
  }
  return index % 2 === 0 ? "#1e293b" : "#64748b"
}

export default function BarChart({ data }: { data: ClassGroup[] }) {
  const series = data.slice(0, 10)
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={series} margin={{ top: 24, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
          <XAxis
            dataKey="recclass"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#94a3b8" }}
            tickLine={{ stroke: "#94a3b8" }}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={34}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
          />
          <Bar dataKey="quantity" name="Hallazgos" radius={[6, 6, 0, 0]}>
            {series.map((item, index) => (
              <Cell key={item.recclass} fill={getBarColor(index)} />
            ))}
            <LabelList
              dataKey="quantity"
              position="inside"
              fill="#f8fafc"
              fontSize={11}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
