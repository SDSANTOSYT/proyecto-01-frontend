import { useState } from "react";
import { toast } from "sonner";
import ModalConfirmacion from "./ModalConfirmacion";
import useFavoritos from "../hooks/useFavoritos";
import type { Serie } from "../types/serie";

interface BotonFavoritoProps {
  serie: Serie;
  // "icono": estrella sobre la tarjeta / "completo": botón con texto (detalle)
  variante?: "icono" | "completo";
}

function BotonFavorito({ serie, variante = "icono" }: BotonFavoritoProps) {
  const { esFavorito, agregarFavorito, quitarFavorito } = useFavoritos();
  const [confirmando, setConfirmando] = useState(false);
  const guardada = esFavorito(serie.id);

  function manejarClick() {
    if (guardada) {
      // Quitar es destructivo: primero se pide confirmación
      setConfirmando(true);
    } else {
      agregarFavorito(serie);
      toast.success(`${serie.name} se agregó a favoritos`);
    }
  }

  function confirmarQuitar() {
    quitarFavorito(serie.id);
    setConfirmando(false);
    toast.info(`${serie.name} se quitó de favoritos`);
  }

  const etiqueta = guardada
    ? `Quitar ${serie.name} de favoritos`
    : `Agregar ${serie.name} a favoritos`;

  return (
    <>
      {variante === "icono" ? (
        <button
          type="button"
          onClick={manejarClick}
          aria-label={etiqueta}
          aria-pressed={guardada}
          title={etiqueta}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-md transition-transform hover:scale-110 ${
            guardada
              ? "bg-amber-400 text-white"
              : "bg-white/90 text-slate-400 dark:bg-slate-800/90"
          }`}
        >
          <span aria-hidden="true">★</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={manejarClick}
          aria-pressed={guardada}
          className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition-colors ${
            guardada
              ? "bg-amber-400 text-slate-900 hover:bg-amber-500"
              : "bg-cyan-600 text-white hover:bg-cyan-700"
          }`}
        >
          <span aria-hidden="true">★</span>
          {guardada ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      )}

      {/* Solo se monta mientras se confirma, para no tener un <dialog> por tarjeta */}
      {confirmando && (
        <ModalConfirmacion
          abierto={confirmando}
          titulo="¿Quitar de favoritos?"
          textoConfirmar="Quitar"
          peligro
          onConfirmar={confirmarQuitar}
          onCancelar={() => setConfirmando(false)}
        >
          ¿Estás seguro de que quieres quitar <strong>{serie.name}</strong> de
          tus favoritos?
        </ModalConfirmacion>
      )}
    </>
  );
}

export default BotonFavorito;
