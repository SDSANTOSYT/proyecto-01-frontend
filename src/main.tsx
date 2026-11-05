import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TemaProvider from "./context/TemaProvider.tsx";
import FavoritosProvider from "./context/FavoritosProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TemaProvider>
      <FavoritosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritosProvider>
    </TemaProvider>
  </StrictMode>,
);
