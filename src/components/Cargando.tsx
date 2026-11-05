interface CargandoProps {
  mensaje?: string;
}

function Cargando({ mensaje = "Cargando datos..." }: CargandoProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-20"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"
        aria-hidden="true"
      />
      <p className="text-slate-500 dark:text-slate-400">{mensaje}</p>
    </div>
  );
}

export default Cargando;
