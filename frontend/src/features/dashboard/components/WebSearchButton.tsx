import { ExternalIcon } from "@/components/Icons";

export default function WebSearchButton({ name }: { name: string }) {
  const query = encodeURIComponent(`Muéstrame imágenes y detalles del meteorito ${name}`);

  return (
    <a
      className="web-button"
      href={`https://www.google.com/search?q=${query}&udm=50`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Buscar imágenes de ${name} con IA`}
    >
      <ExternalIcon />
    </a>
  );
}
