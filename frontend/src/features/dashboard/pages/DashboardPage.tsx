import { useState } from "react";

import type { Filters } from "@/api/types";
import LoadButton from "@/features/dashboard/components/LoadButton";
import LogoutButton from "@/features/dashboard/components/LogoutButton";
import SearchBar from "@/features/dashboard/components/SearchBar";
import MeteoriteIllustration from "@/features/dashboard/components/MeteoriteIllustration";
import StatsPanel from "@/features/dashboard/components/StatsPanel";
import MeteoritesTable from "@/features/dashboard/components/MeteoritesTable";
import GlassCard from "@/components/GlassCard";
import "@/features/dashboard/styles.css";
import PlanetIcon from "@/components/PlanetIcon";

const INITIAL_FILTERS: Filters = {
  search: "",
  recclass: "",
  fall: "",
  year_min: "",
  year_max: "",
  ordering: "-year",
};

export default function DashboardPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [version, setVersion] = useState(0);

  function changeFilters(newFilters: Filters) {
    setFilters(newFilters);
    setPage(1);
  }

  function refreshData() {
    setVersion((value) => value + 1);
  }

  return (
    <main className="dashboard">
      <aside className="dashboard-sidebar">
        <GlassCard className="upload-card">
          <MeteoriteIllustration />
          <LoadButton onLoad={refreshData} />
        </GlassCard>

        <GlassCard className="info-card">
          <div className="info-header">
            <PlanetIcon size={52} />
            <span className="info-name">Eduar Zorro</span>
          </div>
          <small>
            Módulo adicional implementado: Búsqueda web según contexto del
            meteorito.
          </small>
        </GlassCard>
        
      </aside>
      <section className="dashboard-content">
        <StatsPanel filters={filters} version={version} />
        <GlassCard className="table-card">
          <h2 className="section-title">Tabla de búsqueda</h2>
          <SearchBar filters={filters} onChange={changeFilters} />
          <MeteoritesTable
            filters={filters}
            page={page}
            version={version}
            onChangeFilters={changeFilters}
            onChangePage={setPage}
          />
        </GlassCard>
      </section>
      <LogoutButton />
    </main>
  );
}
