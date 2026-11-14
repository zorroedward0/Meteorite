interface Props {
  total: number;
  page: number;
  perPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({ total, page, perPage, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const noun = total === 1 ? "meteorito" : "meteoritos";
  return (
    <div className="pagination">
      <span className="pagination-info">
        {total.toLocaleString("es-CO")} {noun} · página {page} de {totalPages}
      </span>
      <div className="pagination-buttons">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
