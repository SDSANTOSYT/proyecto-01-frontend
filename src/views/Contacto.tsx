import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import ModalConfirmacion from "../components/ModalConfirmacion";

interface Formulario {
  nombre: string;
  email: string;
  mensaje: string;
}

type Campo = keyof Formulario;

const FORMULARIO_VACIO: Formulario = { nombre: "", email: "", mensaje: "" };
const MAX_MENSAJE = 500;

function validar(formulario: Formulario) {
  const errores: Partial<Record<Campo, string>> = {};

  if (formulario.nombre.trim().length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())) {
    errores.email = "Ingresa un email válido (debe contener @ y .)";
  }
  if (formulario.mensaje.trim().length < 10) {
    errores.mensaje = "El mensaje debe tener al menos 10 caracteres";
  }

  return errores;
}

function Contacto() {
  const [formulario, setFormulario] = useState<Formulario>(FORMULARIO_VACIO);
  // Los errores solo se muestran en los campos que el usuario ya tocó
  const [tocados, setTocados] = useState<Record<Campo, boolean>>({
    nombre: false,
    email: false,
    mensaje: false,
  });
  const [confirmando, setConfirmando] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const errores = validar(formulario);
  const esValido = Object.keys(errores).length === 0;

  function manejarCambio(
    evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setTocados((actual) => ({ ...actual, [name]: true }));
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!esValido) return;
    setConfirmando(true);
  }

  async function confirmarEnvio() {
    setConfirmando(false);
    setEnviando(true);
    // Simula el envío al servidor
    await new Promise((resolver) => setTimeout(resolver, 1200));
    setEnviando(false);
    toast.success(`¡Gracias, ${formulario.nombre.trim()}! Tu mensaje fue enviado`);
    setFormulario(FORMULARIO_VACIO);
    setTocados({ nombre: false, email: false, mensaje: false });
  }

  function mostrarError(campo: Campo) {
    return tocados[campo] ? errores[campo] : undefined;
  }

  function claseCampo(campo: Campo) {
    const base =
      "w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 focus:ring-2 focus:outline-none disabled:opacity-60 dark:bg-slate-800 dark:text-slate-100";
    return mostrarError(campo)
      ? `${base} border-red-500 focus:ring-red-400`
      : `${base} border-slate-300 focus:ring-cyan-400 dark:border-slate-700`;
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <title>Contacto · SerieScope</title>
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
      </p>

      <form
        noValidate
        onSubmit={manejarEnvio}
        className="mt-8 flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900 dark:ring-slate-800"
        aria-label="Formulario de contacto"
      >
        <div>
          <label htmlFor="nombre" className="mb-1 block text-sm font-semibold">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={formulario.nombre}
            onChange={manejarCambio}
            onBlur={() => setTocados((actual) => ({ ...actual, nombre: true }))}
            disabled={enviando}
            aria-invalid={!!mostrarError("nombre")}
            aria-describedby="nombre-error"
            className={claseCampo("nombre")}
          />
          <p id="nombre-error" className="mt-1 min-h-5 text-xs text-red-600 dark:text-red-400">
            {mostrarError("nombre")}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formulario.email}
            onChange={manejarCambio}
            onBlur={() => setTocados((actual) => ({ ...actual, email: true }))}
            disabled={enviando}
            aria-invalid={!!mostrarError("email")}
            aria-describedby="email-error"
            className={claseCampo("email")}
          />
          <p id="email-error" className="mt-1 min-h-5 text-xs text-red-600 dark:text-red-400">
            {mostrarError("email")}
          </p>
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-1 block text-sm font-semibold">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            maxLength={MAX_MENSAJE}
            placeholder="Escribe tu mensaje aquí..."
            value={formulario.mensaje}
            onChange={manejarCambio}
            onBlur={() => setTocados((actual) => ({ ...actual, mensaje: true }))}
            disabled={enviando}
            aria-invalid={!!mostrarError("mensaje")}
            aria-describedby="mensaje-error mensaje-contador"
            className={`${claseCampo("mensaje")} resize-y`}
          />
          <div className="mt-1 flex justify-between gap-2 text-xs">
            <p id="mensaje-error" className="min-h-5 text-red-600 dark:text-red-400">
              {mostrarError("mensaje")}
            </p>
            <p id="mensaje-contador" className="shrink-0 text-slate-400">
              {formulario.mensaje.length}/{MAX_MENSAJE}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!esValido || enviando}
          className="rounded-lg bg-cyan-600 py-3 font-semibold text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300 dark:disabled:bg-cyan-900 dark:disabled:text-slate-400"
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>

      <ModalConfirmacion
        abierto={confirmando}
        titulo="¿Enviar mensaje?"
        textoConfirmar="Enviar"
        onConfirmar={confirmarEnvio}
        onCancelar={() => setConfirmando(false)}
      >
        Se enviará tu mensaje a nombre de{" "}
        <strong>{formulario.nombre.trim()}</strong> ({formulario.email.trim()}).
      </ModalConfirmacion>
    </section>
  );
}

export default Contacto;
