import { createContext } from "react";
import type { Serie } from "../types/serie";

export interface FavoritosContextValue {
  favoritos: Serie[];
  esFavorito: (id: number) => boolean;
  agregarFavorito: (serie: Serie) => void;
  quitarFavorito: (id: number) => void;
  vaciarFavoritos: () => void;
}

export const FavoritosContext = createContext<FavoritosContextValue | null>(
  null,
);
