import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalConfirmacionProps {
  abierto: boolean;
  titulo: string;
  children: ReactNode;
  textoConfirmar?: string;
  textoCancelar?: string;
  peligro?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

// Modal de confirmación con <dialog> nativo: useRef para acceder al elemento
// y showModal() / close() para abrirlo y cerrarlo según la prop "abierto"
function ModalConfirmacion({
  abierto,
  titulo,
  children,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  peligro = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (abierto && !dialog.open) {
      dialog.showModal();
    } else if (!abierto && dialog.open) {
      dialog.close();
    }
  }, [abierto]);

  return (
    <dialog
      ref={dialogRef}
      // Escape cierra el dialog de forma nativa: lo tratamos como "Cancelar"
      onCancel={(evento) => {
        evento.preventDefault();
        onCancelar();
      }}
      aria-labelledby={idTitulo}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-6 text-center text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:bg-slate-900 dark:text-slate-100"
    >
      <span className="text-4xl" aria-hidden="true">
        {peligro ? "⚠️" : "❓"}
      </span>
      <h2 id={idTitulo} className="mt-2 text-xl font-bold">
        {titulo}
      </h2>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {children}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-lg bg-slate-200 px-5 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          {textoCancelar}
        </button>
        <button
          type="button"
          onClick={onConfirmar}
          className={`rounded-lg px-5 py-2 font-semibold text-white transition-colors ${
            peligro
              ? "bg-red-600 hover:bg-red-700"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {textoConfirmar}
        </button>
      </div>
    </dialog>
  );
}

export default ModalConfirmacion;
