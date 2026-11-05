import { createContext } from "react";

export type Tema = "claro" | "oscuro";

export interface TemaContextValue {
  tema: Tema;
  alternarTema: () => void;
}

export const TemaContext = createContext<TemaContextValue | null>(null);
