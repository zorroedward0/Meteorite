import type { Filters, Meteorite } from "@/api/types";
import MeteoriteIcon from "@/components/MeteoriteIcon";
import { ArrowsIcon } from "@/components/Icons";
import WebSearchButton from "@/features/dashboard/components/WebSearchButton";
import Pagination from "@/features/dashboard/components/Pagination";
import { useMeteorites } from "@/features/dashboard/hooks/useMeteorites";

const PER_PAGE = 20;

function formatMass(meteorite: Meteorite) {
  if (meteorite.mass_g === null) {
    return "—";
  }
  return Number(meteorite.mass_g).toLocaleString("es-CO");
}

function formatFall(fall: string) {
  return fall === "Fell" ? "Cayó" : "Encontrado";
}

interface SortHeaderProps {
  title: string;
  field: string;
  ordering: string;
  onSort: (field: string) => void;
}

function SortHeader({ title, field, ordering, onSort }: SortHeaderProps) {
  const active = ordering === field || ordering === `-${field}`;
  return (
    <th>
      <button
        type="button"
        className={`sort-header ${active ? "active" : ""}`}
        onClick={() => onSort(field)}
      >
        {title}
        <ArrowsIcon />
      </button>
    </th>
  );
}

interface Props {
  filters: Filters;
  page: number;
  version: number;
  onChangeFilters: (filters: Filters) => void;
  onChangePage: (page: number) => void;
}

export default function MeteoritesTable({
  filters,
  page,
  version,
  onChangeFilters,
  onChangePage,
}: Props) {
  const { data, error } = useMeteorites(filters, page, version);

  function handleSort(field: string) {
    const next = filters.ordering === field ? `-${field}` : field;
    onChangeFilters({ ...filters, ordering: next });
  }

  return (
    <div className="table-area">
      {error && <p className="error-notice">{error}</p>}
      {!error && !data && (
        <p className="loading-notice">Consultando meteoritos…</p>
      )}
      {data && (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="icon-column" aria-label="Icono" />
                  <SortHeader
                    title="Nombre"
                    field="name"
                    ordering={filters.ordering}
                    onSort={handleSort}
                  />
                  <th>Clase</th>
                  <SortHeader
                    title="Masa (g)"
                    field="mass_g"
                    ordering={filters.ordering}
                    onSort={handleSort}
                  />
                  <th>Hallazgo</th>
                  <SortHeader
                    title="Año"
                    field="year"
                    ordering={filters.ordering}
                    onSort={handleSort}
                  />
                  <th aria-label="Buscar en la web" />
                </tr>
              </thead>
              <tbody>
                {data.results.map((meteorite) => (
                  <tr key={meteorite.id}>
                    <td className="icon-column">
                      <MeteoriteIcon seed={meteorite.recclass} />
                    </td>
                    <td className="name-cell">{meteorite.name}</td>
                    <td className="class-cell">{meteorite.recclass}</td>
                    <td className="number-cell">{formatMass(meteorite)}</td>
                    <td>{formatFall(meteorite.fall)}</td>
                    <td className="number-cell">{meteorite.year ?? "—"}</td>
                    <td>
                      <WebSearchButton name={meteorite.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={data.count}
            page={page}
            perPage={PER_PAGE}
            onChange={onChangePage}
          />
        </>
      )}
    </div>
  );
}
