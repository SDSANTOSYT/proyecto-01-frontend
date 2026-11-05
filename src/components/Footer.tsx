const anioActual = new Date().getFullYear();

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <p>
        Datos obtenidos de{" "}
        <a
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
        >
          TVMaze API
        </a>
      </p>
      <p className="mt-1">© {anioActual} SerieScope · Proyecto 01 Frontend</p>
    </footer>
  );
}

export default Footer;
