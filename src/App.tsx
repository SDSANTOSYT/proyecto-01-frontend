import useTema from "./hooks/useTema";
import useFavoritos from "./hooks/useFavoritos";

// Vista temporal para probar los contextos; en el paso 4 se reemplaza por las rutas
function App() {
  const { tema, alternarTema } = useTema();
  const { favoritos } = useFavoritos();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold">
        Explorador de <span className="text-cyan-500">Series</span>
      </h1>
      <p>Favoritos guardados: {favoritos.length}</p>
      <button
        className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white"
        onClick={alternarTema}
      >
        Tema actual: {tema}
      </button>
    </main>
  );
}

export default App;
