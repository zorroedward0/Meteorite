import { useState } from "react"

import { loadMeteorites } from "@/api/meteorites"
import { HttpError } from "@/api/client"
import type { UploadReport } from "@/api/types"
import PrimaryButton from "@/components/PrimaryButton"
import { useSession } from "@/features/auth/context/AuthContext"

export default function LoadButton({ onLoad }: { onLoad: () => void }) {
  const { authenticated } = useSession()
  const [limit, setLimit] = useState("")
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<UploadReport | null>(null)
  const [error, setError] = useState("")

  async function load() {
      
    setLoading(true)
    setError("")
    setReport(null)
    try {
      const parsedLimit = limit.trim() ? Number(limit) : undefined
      const result = await loadMeteorites(parsedLimit)
      setReport(result)
      onLoad()
    } catch (exception) {
      const status = exception instanceof HttpError ? exception.status : 0
      setError(
        status === 401
          ? "HTTP 401 · la carga masiva exige iniciar sesión con usuario."
          : "No se pudo completar la carga.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="upload">
      <div className="upload-controls">
        <input
          type="number"
          min="1"
          placeholder="Límite (opcional)"
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
          disabled={loading}
          aria-label="Límite de meteoritos a cargar"
        />
        <PrimaryButton onClick={load} disabled={loading}>
          {loading ? "Cargando…" : "Cargar"}
        </PrimaryButton>
      </div>
      {!authenticated && (
        <p className="upload-hint">Modo invitado: esta acción responde 401.</p>
      )}
      {report && (
        <p className="upload-report">
          Recibidos {report.received.toLocaleString("es-CO")} · nuevos{" "}
          {report.created.toLocaleString("es-CO")} · total en base{" "}
          {report.total.toLocaleString("es-CO")}
        </p>
      )}
      {error && <p className="upload-error">{error}</p>}
    </div>
  )
}
