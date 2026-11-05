import { useEffect, useState, type ReactNode } from "react";
import { TemaContext, type Tema } from "./tema";

const CLAVE_STORAGE = "tema";

// Usa el tema guardado; si no hay, respeta la preferencia del sistema
function temaInicial(): Tema {
  const guardado = localStorage.getItem(CLAVE_STORAGE);
  if (guardado === "claro" || guardado === "oscuro") {
    return guardado;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oscuro"
    : "claro";
}

interface TemaProviderProps {
  children: ReactNode;
}

function TemaProvider({ children }: TemaProviderProps) {
  const [tema, setTema] = useState<Tema>(temaInicial);

  // Tailwind aplica las clases dark: cuando <html> tiene la clase "dark"
  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "oscuro");
    localStorage.setItem(CLAVE_STORAGE, tema);
  }, [tema]);

  function alternarTema() {
    setTema((actual) => (actual === "oscuro" ? "claro" : "oscuro"));
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export default TemaProvider;
