import { useState } from "react";
import { Link, NavLink } from "react-router";
import BotonTema from "./BotonTema";
import useFavoritos from "../hooks/useFavoritos";

const enlaces = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/explorar", texto: "Explorar" },
  { ruta: "/favoritos", texto: "Favoritos" },
  { ruta: "/contacto", texto: "Contacto" },
];

function claseEnlace({ isActive }: { isActive: boolean }) {
  const base =
    "block rounded-md px-3 py-2 text-sm font-medium transition-colors md:py-1";
  return isActive
    ? `${base} text-white md:underline md:decoration-cyan-400 md:decoration-2 md:underline-offset-8 bg-slate-800 md:bg-transparent`
    : `${base} text-slate-300 hover:bg-slate-800 hover:text-white md:hover:bg-transparent`;
}

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { favoritos } = useFavoritos();

  return (
    <header className="sticky top-0 z-40 bg-slate-900 shadow-md">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-3"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-cyan-400"
        >
          <span aria-hidden="true">📺</span>
          SerieScope
        </Link>

        <div className="flex items-center gap-2 md:order-last">
          <BotonTema />
          <button
            type="button"
            className="rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-principal"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <span aria-hidden="true" className="text-xl">
              {menuAbierto ? "✕" : "☰"}
            </span>
          </button>
        </div>

        <ul
          id="menu-principal"
          className={`${menuAbierto ? "flex" : "hidden"} mt-3 w-full flex-col gap-1 md:mt-0 md:flex md:w-auto md:flex-row md:gap-4`}
        >
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <NavLink
                to={enlace.ruta}
                end={enlace.ruta === "/"}
                className={claseEnlace}
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.texto}
                {enlace.ruta === "/favoritos" && favoritos.length > 0 && (
                  <span
                    className="ml-1.5 rounded-full bg-cyan-500 px-1.5 py-0.5 text-xs font-bold text-slate-900"
                    aria-label={`${favoritos.length} favoritos`}
                  >
                    {favoritos.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
