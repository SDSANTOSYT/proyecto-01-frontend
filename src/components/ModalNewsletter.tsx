import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

const CLAVE_STORAGE = "newsletter-mostrado";
const RETRASO_MS = 6000;

//DARK PATTERN INTENCIONAL (con fines educativos)

function ModalNewsletter() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  // Dark pattern 5: la casilla empieza marcada
  const [compartirDatos, setCompartirDatos] = useState(true);

  useEffect(() => {
    // Se muestra solo una vez por sesión
    if (sessionStorage.getItem(CLAVE_STORAGE)) return;

    const temporizador = setTimeout(() => {
      dialogRef.current?.showModal();
      sessionStorage.setItem(CLAVE_STORAGE, "true");
    }, RETRASO_MS);

    return () => clearTimeout(temporizador);
  }, []);

  function cerrar() {
    dialogRef.current?.close();
  }

  function suscribirse(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    cerrar();
    toast.success("¡Te suscribiste al boletín semanal de series!");
    setEmail("");
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="newsletter-titulo"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/70 dark:bg-slate-900 dark:text-slate-100"
    >
      {/* Dark pattern 4: cerrar diminuto y casi invisible */}
      <button
        type="button"
        onClick={cerrar}
        aria-label="Cerrar"
        className="absolute top-1 right-2 text-xs text-white/30 hover:text-white/60"
      >
        ×
      </button>

      <div className="bg-gradient-to-br from-cyan-500 to-sky-700 px-6 py-8 text-center text-white">
        <span className="text-5xl" aria-hidden="true">
          🎬
        </span>
        <h2 id="newsletter-titulo" className="mt-3 text-2xl font-extrabold">
          ¡Espera! No te vayas sin esto
        </h2>
        <p className="mt-2 text-cyan-50">
          Recibe cada semana las series más populares directo en tu correo.
        </p>
      </div>

      <form onSubmit={suscribirse} className="flex flex-col gap-4 p-6">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="tu@correo.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
        />

        <label className="flex items-start gap-2 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={compartirDatos}
            onChange={(evento) => setCompartirDatos(evento.target.checked)}
            className="mt-0.5"
          />
          Acepto compartir mis datos con socios comerciales para recibir
          ofertas personalizadas.
        </label>

        {/* Dark pattern 3: aceptar es enorme y llamativo */}
        <button
          type="submit"
          className="rounded-lg bg-cyan-600 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-cyan-700"
        >
          ¡Sí, quiero suscribirme!
        </button>

        {/* Dark pattern 2 y 3: confirmshaming con un enlace pequeño y gris */}
        <button
          type="button"
          onClick={cerrar}
          className="text-[11px] text-slate-400 hover:underline dark:text-slate-500"
        >
          No, prefiero perderme las mejores series
        </button>
      </form>
    </dialog>
  );
}

export default ModalNewsletter;
