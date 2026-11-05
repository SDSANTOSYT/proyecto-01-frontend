import { Link } from "react-router";
import BotonFavorito from "./BotonFavorito";
import { traducirEstado } from "../utils/formato";
import type { Serie } from "../types/serie";

interface TarjetaProps {
  serie: Serie;
}

function Tarjeta({ serie }: TarjetaProps) {
  const cadena = serie.network?.name ?? serie.webChannel?.name;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800">
      <Link
        to={`/explorar/${serie.id}`}
        className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        {serie.image ? (
          <img
            src={serie.image.medium}
            alt={`Póster de ${serie.name}`}
            loading="lazy"
            className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex aspect-[2/3] w-full items-center justify-center bg-slate-200 text-slate-500 dark:bg-slate-800"
            role="img"
            aria-label={`${serie.name} no tiene póster`}
          >
            Sin imagen
          </div>
        )}

        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="font-bold leading-tight">{serie.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {traducirEstado(serie.status)}
            {cadena && ` · ${cadena}`}
          </p>
          <p className="text-sm">
            <span aria-hidden="true">⭐</span>{" "}
            <span className="sr-only">Rating:</span>
            {serie.rating.average ?? "Sin rating"}
          </p>
          <ul className="mt-auto flex flex-wrap gap-1 pt-2" aria-label="Géneros">
            {serie.genres.slice(0, 3).map((genero) => (
              <li
                key={genero}
                className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300"
              >
                {genero}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      {/* El botón queda fuera del Link para no anidar elementos interactivos */}
      <div className="absolute top-2 right-2 z-10">
        <BotonFavorito serie={serie} />
      </div>
    </article>
  );
}

export default Tarjeta;
