interface ErrorMensajeProps {
  mensaje: string;
  onReintentar?: () => void;
}

function ErrorMensaje({ mensaje, onReintentar }: ErrorMensajeProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20 text-center"
      role="alert"
    >
      <span className="text-5xl" aria-hidden="true">
        ⚠️
      </span>
      <p className="font-semibold text-red-600 dark:text-red-400">
        No se pudo cargar la información.
      </p>
      <p className="text-sm text-red-500 dark:text-red-300">{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="mt-2 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMensaje;
