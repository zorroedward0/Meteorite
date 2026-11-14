import { useEffect, useState } from "react";

import type { Filters } from "@/api/types";
import { SettingsIcon, SearchIcon } from "@/components/Icons";
import { useClasses } from "@/features/dashboard/hooks/useClasses";

const SORT_OPTIONS = [
  ["-year", "Año · reciente primero"],
  ["year", "Año · antiguo primero"],
  ["-mass_g", "Masa · mayor primero"],
  ["mass_g", "Masa · menor primero"],
  ["name", "Nombre · A-Z"],
  ["-name", "Nombre · Z-A"],
];

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function SearchBar({ filters, onChange }: Props) {
  const classes = useClasses();
  const [text, setText] = useState(filters.search);
  const [filtersVisible, setFiltersVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text !== filters.search) {
        onChange({ ...filters, search: text });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [text]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    onChange({ ...filters, [event.target.name]: event.target.value });
  }

  function clearFilters() {
    onChange({
      ...filters,
      recclass: "",
      fall: "",
      year_min: "",
      year_max: "",
    });
  }

  return (
    <div className="search-bar">
      <div className="main-search">
        <div className="search-box">
          <SearchIcon />
          <input
            name="search"
            placeholder="Buscar por nombre o clase…"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <select
          name="ordering"
          value={filters.ordering}
          onChange={handleChange}
          aria-label="Orden"
        >
          {SORT_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={`settings-button ${filtersVisible ? "active" : ""}`}
          onClick={() => setFiltersVisible(!filtersVisible)}
          aria-label="Mostrar u ocultar filtros"
        >
          <SettingsIcon />
        </button>
      </div>
      {filtersVisible && (
        <div className="search-filters">
          <select
            name="recclass"
            value={filters.recclass}
            onChange={handleChange}
            aria-label="Clase"
          >
            <option value="">Todas las clases</option>
            {classes.map((itemClass) => (
              <option key={itemClass} value={itemClass}>
                {itemClass}
              </option>
            ))}
          </select>
          <select
            name="fall"
            value={filters.fall}
            onChange={handleChange}
            aria-label="Hallazgo"
          >
            <option value="">Todo tipo de hallazgo</option>
            <option value="Fell">Cayó (visto en caída)</option>
            <option value="Found">Encontrado</option>
          </select>
          <input
            name="year_min"
            type="number"
            placeholder="Año desde"
            value={filters.year_min}
            onChange={handleChange}
          />
          <input
            name="year_max"
            type="number"
            placeholder="Año hasta"
            value={filters.year_max}
            onChange={handleChange}
          />
          <button type="button" className="clear-button" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
