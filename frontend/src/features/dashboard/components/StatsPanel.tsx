import type { Filters } from "@/api/types"
import AreaChart from "@/features/dashboard/components/AreaChart"
import BarChart from "@/features/dashboard/components/BarChart"
import FallChart from "@/features/dashboard/components/FallChart"
import { useStats } from "@/features/dashboard/hooks/useStats"

function toTons(value: number | null) {
  if (value === null) {
    return "—"
  }
  const options = { maximumFractionDigits: 1 }
  const text = (value / 1_000_000).toLocaleString("es-CO", options)
  return `${text} t`
}

function toKilograms(value: number | null) {
  if (value === null) {
    return "—"
  }
  const options = { maximumFractionDigits: 1 }
  const text = (value / 1_000).toLocaleString("es-CO", options)
  return `${text} kg`
}

interface Props {
  filters: Filters
  version: number
}

export default function StatsPanel({ filters, version }: Props) {
  const { data, error } = useStats(filters, version)

  if (error) {
    return <p className="error-notice">{error}</p>
  }

  if (!data) {
    return (
      <p className="loading-notice">Calculando estadísticas en la base de datos…</p>
    )
  }

  const { metrics } = data

  return (
    <div className="card stats-card">
      <h2 className="section-title">Estadísticas</h2>
      <div className="metrics">
        <div className="metric">
          <span className="figure">{metrics.total.toLocaleString("es-CO")}</span>
          <span className="label">meteoritos en el segmento</span>
        </div>
        <div className="metric">
          <span className="figure">{toTons(metrics.mass_total)}</span>
          <span className="label">masa total</span>
        </div>
        <div className="metric">
          <span className="figure">{toKilograms(metrics.mass_average)}</span>
          <span className="label">masa promedio</span>
        </div>
        <div className="metric">
          <span className="figure">{toTons(metrics.mass_max)}</span>
          <span className="label">masa máxima registrada</span>
        </div>
      </div>
      <div className="charts-row">
        <div className="chart-container">
          <h3 className="chart-subtitle">Top 10 clases por hallazgos</h3>
          <BarChart data={data.by_class} />
        </div>
        <div className="chart-container">
          <h3 className="chart-subtitle">Encontrados vs. vistos en caída</h3>
          <FallChart data={data.by_fall} />
        </div>
      </div>
      <div className="chart-container">
        <h3 className="chart-subtitle">Hallazgos por año (desde 1950)</h3>
        <AreaChart data={data.by_year} />
      </div>
    </div>
  )
}
