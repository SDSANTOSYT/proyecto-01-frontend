import { useEffect, useState, type ReactNode } from "react";
import { FavoritosContext } from "./favoritos";
import type { Serie } from "../types/serie";

const CLAVE_STORAGE = "favoritos";

// Lee los favoritos guardados; si no hay o el JSON está dañado, empieza vacío
function cargarFavoritos(): Serie[] {
  try {
    const guardados = localStorage.getItem(CLAVE_STORAGE);
    return guardados ? JSON.parse(guardados) : [];
  } catch {
    return [];
  }
}

interface FavoritosProviderProps {
  children: ReactNode;
}

// El estado vive aquí, por encima de las rutas, para que persista al navegar
function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<Serie[]>(cargarFavoritos);

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(favoritos));
  }, [favoritos]);

  function esFavorito(id: number) {
    return favoritos.some((serie) => serie.id === id);
  }

  function agregarFavorito(serie: Serie) {
    setFavoritos((actuales) =>
      actuales.some((favorito) => favorito.id === serie.id)
        ? actuales
        : [...actuales, serie],
    );
  }

  function quitarFavorito(id: number) {
    setFavoritos((actuales) => actuales.filter((serie) => serie.id !== id));
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, esFavorito, agregarFavorito, quitarFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export default FavoritosProvider;
