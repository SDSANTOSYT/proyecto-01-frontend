import { useContext } from "react";
import { FavoritosContext } from "../context/favoritos";

function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error("useFavoritos debe usarse dentro de <FavoritosProvider>");
  }

  return contexto;
}

export default useFavoritos;
