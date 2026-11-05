import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useTema from "../hooks/useTema";

// Estructura común a todas las rutas: navbar, contenido de la ruta y footer
function Layout() {
  const { tema } = useTema();

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
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
