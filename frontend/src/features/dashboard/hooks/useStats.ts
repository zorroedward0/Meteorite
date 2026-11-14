import { useEffect, useState } from "react"

import { getStats } from "@/api/meteorites"
import type { Stats, StatsFilters } from "@/api/types"

export function useStats(filters: StatsFilters, version: number) {
  const [data, setData] = useState<Stats | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    setError("")
    getStats(filters)
      .then((response) => {
        if (active) {
          setData(response)
        }
      })
      .catch(() => {
        if (active) {
          setError("No se pudieron consultar las estadísticas.")
        }
      })
    return () => {
      active = false
    }
  }, [filters, version])

  return { data, error }
}
