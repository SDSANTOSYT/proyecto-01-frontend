import { Link, useLocation } from "react-router";

function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="flex flex-col items-center px-4 py-24 text-center sm:py-32">
      <p
        className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-8xl font-black text-transparent sm:text-9xl"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
        La ruta <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">{pathname}</code>{" "}
        no existe en esta aplicación.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
        >
          Volver al inicio
        </Link>
        <Link
          to="/explorar"
          className="rounded-lg px-6 py-3 font-semibold text-cyan-700 ring-1 ring-cyan-600/40 transition-colors hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-950/40"
        >
          Explorar series
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
