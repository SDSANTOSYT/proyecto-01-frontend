import { useContext } from "react";
import { TemaContext } from "../context/tema";

function useTema() {
  const contexto = useContext(TemaContext);

  if (!contexto) {
    throw new Error("useTema debe usarse dentro de <TemaProvider>");
  }

  return contexto;
}

export default useTema;
