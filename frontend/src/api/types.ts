export interface Meteorite {
  id: number
  nasa_id: number
  name: string
  nametype: string
  recclass: string
  mass_g: string | null
  fall: string
  year: number | null
  reclat: string | null
  reclong: string | null
}

export interface Page<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Filters {
  search: string
  recclass: string
  fall: string
  year_min: string
  year_max: string
  ordering: string
}

export type StatsFilters = Pick<Filters, "recclass" | "fall" | "year_min" | "year_max">

export interface Metrics {
  total: number
  mass_total: number | null
  mass_average: number | null
  mass_max: number | null
  mass_min: number | null
}

export interface ClassGroup {
  recclass: string
  quantity: number
  mass: number | null
}

export interface YearGroup {
  year: number | null
  quantity: number
  mass: number | null
}

export interface FallGroup {
  fall: string
  quantity: number
}

export interface Stats {
  metrics: Metrics
  by_class: ClassGroup[]
  by_year: YearGroup[]
  by_fall: FallGroup[]
}

export interface UploadReport {
  received: number
  valids: number
  created: number
  total: number
}
