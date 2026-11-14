import { buildQuery, request } from "./client";
import type {
  Stats,
  Filters,
  StatsFilters,
  UploadReport,
  Meteorite,
  Page,
} from "./types";

export function listMeteorites(filters: Filters, page: number) {
  return request<Page<Meteorite>>(
    `/api/meteorites/${buildQuery({ ...filters, page })}`,
  );
}

export function listClasses() {
  return request<{ classes: string[] }>("/api/meteorites/classes/");
}

export function getStats(filters: StatsFilters) {
  return request<Stats>(`/api/meteorites/stats/${buildQuery(filters)}`);
}

export function loadMeteorites(limit?: number) {
  return request<UploadReport>("/api/meteorites/load/", {
    method: "POST",
    body: JSON.stringify(limit ? { limit } : {}),
  });
}
