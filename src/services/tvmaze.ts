import type { Serie } from "../types/serie";

const URL_BASE = "https://api.tvmaze.com";

// Lista de series (TVMaze devuelve ~250 por página)
export async function obtenerSeries(signal?: AbortSignal): Promise<Serie[]> {
  const respuesta = await fetch(`${URL_BASE}/shows?page=0`, { signal });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al cargar las series`);
  }

  return respuesta.json();
}

// Detalle de una serie por su id
export async function obtenerSerie(
  id: string,
  signal?: AbortSignal,
): Promise<Serie> {
  const respuesta = await fetch(`${URL_BASE}/shows/${id}`, { signal });

  if (respuesta.status === 404) {
    throw new Error("La serie que buscas no existe");
  }
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al cargar la serie`);
  }

  return respuesta.json();
}
