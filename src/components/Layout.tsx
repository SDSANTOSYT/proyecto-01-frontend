import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useTema from "../hooks/useTema";

// Estructura común a todas las rutas: navbar, contenido de la ruta y footer
function Layout() {
  const { tema } = useTema();
  const { pathname } = useLocation();

  // Al cambiar de página se vuelve al inicio (el router no lo hace solo)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Enlace para usuarios de teclado: solo se ve al recibir el foco */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-900"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Los toasts se cierran solos a los 3.5 s (auto-dismiss) */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3500}
        theme={tema === "oscuro" ? "dark" : "light"}
      />
    </div>
  );
}

export default Layout;
