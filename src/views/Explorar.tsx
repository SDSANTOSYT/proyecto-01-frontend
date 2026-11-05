import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import Tarjeta from "../components/Tarjeta";
import Cargando from "../components/Cargando";
import ErrorMensaje from "../components/ErrorMensaje";
import Vacio from "../components/Vacio";
import ModalNewsletter from "../components/ModalNewsletter";
import { obtenerSeries } from "../services/tvmaze";
import type { Serie } from "../types/serie";

const POR_PAGINA = 24;

function Explorar() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);
  const [cantidadVisible, setCantidadVisible] = useState(POR_PAGINA);

  // La búsqueda y el género viven en la URL (?q=...&genero=...) para que
  // se conserven al volver desde el detalle
  const [parametros, setParametros] = useSearchParams();
  const busqueda = parametros.get("q") ?? "";
  const genero = parametros.get("genero") ?? "";

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarSeries() {
      setCargando(true);
      setError(null);
      try {
        const datos = await obtenerSeries(controlador.signal);
        setSeries(datos);
      } catch (err) {
        if (controlador.signal.aborted) return;
        const mensaje =
          err instanceof Error ? err.message : "Error desconocido";
        setError(mensaje);
        toast.error("No se pudieron cargar las series");
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarSeries();
    // Si el usuario sale de la página antes de que responda, se cancela
    return () => controlador.abort();
  }, [intento]);

  const generos = useMemo(
    () => [...new Set(series.flatMap((serie) => serie.genres))].sort(),
    [series],
  );

  // Filtrado en tiempo real: se recalcula en cada render con lo que se escribe
  const filtradas = series.filter((serie) => {
    const coincideNombre = serie.name
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());
    const coincideGenero = genero === "" || serie.genres.includes(genero);
    return coincideNombre && coincideGenero;
  });
  const visibles = filtradas.slice(0, cantidadVisible);

  function actualizarFiltro(clave: "q" | "genero", valor: string) {
    setParametros(
      (actuales) => {
        if (valor) actuales.set(clave, valor);
        else actuales.delete(clave);
        return actuales;
      },
      { replace: true },
    );
    setCantidadVisible(POR_PAGINA);
  }

  function limpiarFiltros() {
    setParametros({}, { replace: true });
    setCantidadVisible(POR_PAGINA);
  }

  function renderResultados() {
    if (cargando) return <Cargando mensaje="Cargando series..." />;
    if (error) {
      return (
        <ErrorMensaje
          mensaje={`${error}. Verifica tu conexión e intenta de nuevo.`}
          onReintentar={() => setIntento((actual) => actual + 1)}
        />
      );
    }
    if (filtradas.length === 0) {
      return (
        <Vacio
          icono="🔍"
          mensaje="No encontramos series que coincidan con tu búsqueda."
        >
          <button
            type="button"
            onClick={limpiarFiltros}
            className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
          >
            Limpiar filtros
          </button>
        </Vacio>
      );
    }

    return (
      <>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {visibles.map((serie) => (
            <li key={serie.id} className="flex">
              <Tarjeta serie={serie} />
            </li>
          ))}
        </ul>
        {visibles.length < filtradas.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setCantidadVisible((actual) => actual + POR_PAGINA)
              }
              className="rounded-lg bg-cyan-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Cargar más series
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <title>Explorar · SerieScope</title>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Explorar <span className="text-cyan-400">Series</span>
          </h1>
          <p className="mt-2 text-slate-300">
            Datos obtenidos en tiempo real desde la API de TVMaze
          </p>

          <form
            role="search"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(evento) => evento.preventDefault()}
          >
            <label htmlFor="busqueda" className="sr-only">
              Buscar serie por nombre
            </label>
            <input
              id="busqueda"
              type="search"
              placeholder="Buscar serie..."
              value={busqueda}
              onChange={(evento) => actualizarFiltro("q", evento.target.value)}
              className="flex-1 rounded-lg bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <label htmlFor="genero" className="sr-only">
              Filtrar por género
            </label>
            <select
              id="genero"
              value={genero}
              onChange={(evento) =>
                actualizarFiltro("genero", evento.target.value)
              }
              className="rounded-lg bg-white px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            >
              <option value="">Todos los géneros</option>
              {generos.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </form>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-10"
        aria-labelledby="resultados-titulo"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="resultados-titulo" className="text-2xl font-bold">
            Resultados
          </h2>
          {!cargando && !error && (
            <p
              className="text-sm text-slate-500 dark:text-slate-400"
              aria-live="polite"
            >
              Mostrando {visibles.length} de {filtradas.length} series
            </p>
          )}
        </div>
        {renderResultados()}
      </section>

      {/* Modal con dark pattern intencional (ver comentario en el componente) */}
      <ModalNewsletter />
    </>
  );
}

export default Explorar;
