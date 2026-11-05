const estados: Record<string, string> = {
  Running: "En emisión",
  Ended: "Finalizada",
  "To Be Determined": "Por definir",
  "In Development": "En desarrollo",
};

// Traduce el estado que devuelve TVMaze al español
export function traducirEstado(estado: string) {
  return estados[estado] ?? estado;
}

// La sinopsis de TVMaze viene con etiquetas HTML (<p>, <b>...), se las quitamos
export function limpiarHtml(html: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}
