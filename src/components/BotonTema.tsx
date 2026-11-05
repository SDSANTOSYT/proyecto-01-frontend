import useTema from "../hooks/useTema";

function BotonTema() {
  const { tema, alternarTema } = useTema();
  const esOscuro = tema === "oscuro";

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="rounded-md p-2 text-lg hover:bg-slate-800"
      aria-label={esOscuro ? "Activar modo claro" : "Activar modo oscuro"}
      title={esOscuro ? "Modo claro" : "Modo oscuro"}
    >
      <span aria-hidden="true">{esOscuro ? "☀️" : "🌙"}</span>
    </button>
  );
}

export default BotonTema;
