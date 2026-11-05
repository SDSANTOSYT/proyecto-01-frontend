import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import BotonFavorito from "../components/BotonFavorito";
import Cargando from "../components/Cargando";
import ErrorMensaje from "../components/ErrorMensaje";
import { obtenerSerie } from "../services/tvmaze";
import { limpiarHtml, traducirEstado } from "../utils/formato";
import type { Serie } from "../types/serie";

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [serie, setSerie] = useState<Serie | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    if (!id) return;
    const controlador = new AbortController();

    async function cargarSerie(idSerie: string) {
      setCargando(true);
      setError(null);
      try {
        const datos = await obtenerSerie(idSerie, controlador.signal);
        setSerie(datos);
      } catch (err) {
        if (controlador.signal.aborted) return;
        const mensaje =
          err instanceof Error ? err.message : "Error desconocido";
        setError(mensaje);
        toast.error("No se pudo cargar la serie");
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarSerie(id);
    return () => controlador.abort();
  }, [id, intento]);

  // Si se llegó desde Explorar se vuelve atrás (conserva los filtros);
  // si se abrió el enlace directo, se va a /explorar
  function volver() {
    if (location.key !== "default") navigate(-1);
    else navigate("/explorar");
  }

  function renderContenido() {
    if (cargando) return <Cargando mensaje="Cargando serie..." />;
    if (error || !serie) {
      return (
        <ErrorMensaje
          mensaje={error ?? "No se encontró la serie"}
          onReintentar={() => setIntento((actual) => actual + 1)}
        />
      );
    }

    const cadena = serie.network?.name ?? serie.webChannel?.name;
    const anioInicio = serie.premiered?.slice(0, 4);
    const anioFin = serie.ended?.slice(0, 4);
    const datos = [
      { etiqueta: "Estado", valor: traducirEstado(serie.status) },
      {
        etiqueta: "Años",
        valor: anioInicio
          ? `${anioInicio} – ${anioFin ?? "actualidad"}`
          : "Sin fecha",
      },
      { etiqueta: "Cadena", valor: cadena ?? "Desconocida" },
      { etiqueta: "Idioma", valor: serie.language ?? "Desconocido" },
      {
        etiqueta: "Duración",
        valor: serie.runtime ? `${serie.runtime} min` : "Variable",
      },
      {
        etiqueta: "Rating",
        valor: serie.rating.average ? `⭐ ${serie.rating.average} / 10` : "Sin rating",
      },
    ];

    return (
      <article className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 md:flex dark:bg-slate-900 dark:ring-slate-800">
        {serie.image ? (
          <img
            src={serie.image.original}
            alt={`Póster de ${serie.name}`}
            className="aspect-[2/3] w-full object-cover md:w-80 md:shrink-0 lg:w-96"
          />
        ) : (
          <div
            className="flex aspect-[2/3] w-full items-center justify-center bg-slate-200 text-slate-500 md:w-80 md:shrink-0 dark:bg-slate-800"
            role="img"
            aria-label={`${serie.name} no tiene póster`}
          >
            Sin imagen
          </div>
        )}

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <header>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{serie.name}</h1>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Géneros">
              {serie.genres.map((genero) => (
                <li
                  key={genero}
                  className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300"
                >
                  {genero}
                </li>
              ))}
            </ul>
          </header>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {datos.map((dato) => (
              <div key={dato.etiqueta}>
                <dt className="text-slate-500 dark:text-slate-400">
                  {dato.etiqueta}
                </dt>
                <dd className="font-semibold">{dato.valor}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="sinopsis-titulo">
            <h2 id="sinopsis-titulo" className="mb-1 text-lg font-bold">
              Sinopsis
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {limpiarHtml(serie.summary) || "Esta serie no tiene sinopsis."}
            </p>
          </section>

          <div className="mt-auto flex flex-wrap items-center gap-4">
            <BotonFavorito serie={serie} variante="completo" />
            {serie.officialSite && (
              <a
                href={serie.officialSite}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
              >
                Sitio oficial <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <button
        type="button"
        onClick={volver}
        className="mb-6 text-sm font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
      >
        <span aria-hidden="true">←</span> Volver a explorar
      </button>
      {renderContenido()}
    </section>
  );
}

export default Detalle;
