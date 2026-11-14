import { useEffect, useState } from "react"

import { listMeteorites } from "@/api/meteorites"
import type { Filters, Meteorite, Page } from "@/api/types"

export function useMeteorites(filters: Filters, page: number, version: number) {
  const [data, setData] = useState<Page<Meteorite> | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    setError("")
    listMeteorites(filters, page)
      .then((response) => {
        if (active) {
          setData(response)
        }
      })
      .catch(() => {
        if (active) {
          setError("No se pudo consultar la lista de meteoritos.")
        }
      })
    return () => {
      active = false
    }
  }, [filters, page, version])

  return { data, error }
}
