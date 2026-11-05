import { Link } from "react-router";

const caracteristicas = [
  {
    icono: "🔎",
    titulo: "Explora",
    descripcion: "Busca entre cientos de series y filtra por género al instante.",
  },
  {
    icono: "⭐",
    titulo: "Guarda",
    descripcion: "Marca tus series favoritas y encuéntralas cuando quieras.",
  },
  {
    icono: "📖",
    titulo: "Descubre",
    descripcion: "Consulta la sinopsis, el rating y dónde se emite cada serie.",
  },
];

function Inicio() {
  return (
    <>
      <title>Inicio · SerieScope</title>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <p className="mb-4 rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30">
            Datos en tiempo real desde TVMaze
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Descubre tu próxima <span className="text-cyan-400">serie</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            Explora series de televisión de todo el mundo. Busca, filtra por
            género y guarda tus favoritas en un solo lugar.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/explorar"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 shadow-lg transition-colors hover:bg-cyan-400"
            >
              Explorar ahora
            </Link>
            <Link
              to="/favoritos"
              className="rounded-lg px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
            >
              Ver mis favoritos
            </Link>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-16"
        aria-labelledby="caracteristicas-titulo"
      >
        <h2 id="caracteristicas-titulo" className="sr-only">
          Qué puedes hacer
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caracteristicas.map((caracteristica) => (
            <li
              key={caracteristica.titulo}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <span className="text-3xl" aria-hidden="true">
                {caracteristica.icono}
              </span>
              <h3 className="mt-3 text-lg font-bold">{caracteristica.titulo}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {caracteristica.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Inicio;
