import { useState } from "react";
import { toast } from "sonner";
import Tarjeta from "../components/Tarjeta";
import Vacio from "../components/Vacio";
import ModalConfirmacion from "../components/ModalConfirmacion";
import useFavoritos from "../hooks/useFavoritos";

function Favoritos() {
  const { favoritos, vaciarFavoritos } = useFavoritos();
  const [confirmandoVaciar, setConfirmandoVaciar] = useState(false);

  function confirmarVaciar() {
    vaciarFavoritos();
    setConfirmandoVaciar(false);
    toast.info("Se eliminaron todos tus favoritos");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <title>Favoritos · SerieScope</title>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mis favoritos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {favoritos.length}{" "}
            {favoritos.length === 1 ? "serie guardada" : "series guardadas"}
          </p>
        </div>
        {favoritos.length > 0 && (
          <button
            type="button"
            onClick={() => setConfirmandoVaciar(true)}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-600/40 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Quitar todos
          </button>
        )}
      </div>

      {favoritos.length === 0 ? (
        <Vacio
          icono="⭐"
          mensaje="No tienes series favoritas guardadas."
          enlace={{ texto: "Explorar y agregar algunas", ruta: "/explorar" }}
        />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {favoritos.map((serie) => (
            <li key={serie.id} className="flex">
              <Tarjeta serie={serie} />
            </li>
          ))}
        </ul>
      )}

      <ModalConfirmacion
        abierto={confirmandoVaciar}
        titulo="¿Quitar todos los favoritos?"
        textoConfirmar="Quitar todos"
        peligro
        onConfirmar={confirmarVaciar}
        onCancelar={() => setConfirmandoVaciar(false)}
      >
        Se eliminarán las {favoritos.length} series de tu lista. Esta acción no
        se puede deshacer.
      </ModalConfirmacion>
    </section>
  );
}

export default Favoritos;
