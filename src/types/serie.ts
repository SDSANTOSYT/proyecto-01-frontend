// Tipos de la respuesta de TVMaze (solo los campos que usa la app)
// Documentación: https://www.tvmaze.com/api

export interface ImagenSerie {
  medium: string;
  original: string;
}

export interface Cadena {
  id: number;
  name: string;
}

export interface Serie {
  id: number;
  name: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  rating: { average: number | null };
  network: Cadena | null;
  webChannel: Cadena | null;
  image: ImagenSerie | null;
  summary: string | null;
}
