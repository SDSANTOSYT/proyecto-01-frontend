import { Link } from "react-router";

interface VacioProps {
  icono?: string;
  mensaje: string;
  enlace?: { texto: string; ruta: string };
}

function Vacio({ icono = "📭", mensaje, enlace }: VacioProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20 text-center"
      role="status"
    >
      <span className="text-5xl opacity-60" aria-hidden="true">
        {icono}
      </span>
      <p className="text-slate-500 dark:text-slate-400">{mensaje}</p>
      {enlace && (
        <Link
          to={enlace.ruta}
          className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
        >
          {enlace.texto}
        </Link>
      )}
    </div>
  );
}

export default Vacio;
