# SerieScope 📺

Aplicación web (SPA) para explorar series de televisión, ver su detalle y guardar favoritas. Proyecto 01 del curso de Frontend.

- **Repositorio:** https://github.com/SDSANTOSYT/proyecto-01-frontend
- **Demo en Vercel:** _(agregar el enlace después del despliegue)_

## API

Los datos vienen en tiempo real de la [API de TVMaze](https://www.tvmaze.com/api) (pública, gratuita y sin API key):

| Uso     | Endpoint                                |
| ------- | --------------------------------------- |
| Lista   | `GET https://api.tvmaze.com/shows?page=0` |
| Detalle | `GET https://api.tvmaze.com/shows/:id`    |

## Tecnologías

- Vite + React 19 + TypeScript
- React Router
- Tailwind CSS v4 (con modo oscuro)
- Sonner (toasts)

## Rutas

| Ruta            | Vista       | Descripción                                                   |
| --------------- | ----------- | ------------------------------------------------------------- |
| `/`             | Inicio      | Landing con hero y accesos rápidos                            |
| `/explorar`     | Explorar    | Grid de series con búsqueda y filtro por género en tiempo real |
| `/explorar/:id` | Detalle     | Información completa de una serie (ruta dinámica)             |
| `/favoritos`    | Favoritos   | Series guardadas                                              |
| `/contacto`     | Contacto    | Formulario controlado con validación                          |
| `*`             | NotFound    | Página 404                                                    |

## Requisitos cubiertos

- **Dos fetches:** lista (`obtenerSeries`) y detalle por id (`obtenerSerie`) en `src/services/tvmaze.ts`.
- **Estados en la UI:** carga (`Cargando`), error con reintento (`ErrorMensaje`) y vacío (`Vacio`) en búsquedas sin resultados y favoritos vacíos.
- **Búsqueda y filtrado en tiempo real:** por nombre y por género; se guardan en la URL (`?q=&genero=`) para conservarlos al volver del detalle.
- **Favoritos:** estado global con Context (`FavoritosProvider`) por encima de las rutas, persistido en `localStorage`.
- **Formulario controlado:** nombre, email y mensaje con validación, errores por campo y botón deshabilitado mientras sea inválido.
- **Toasts** de éxito, error e info con auto-dismiss (Sonner).
- **Modal de confirmación** con `<dialog>` nativo + `useRef` + `showModal()` (`ModalConfirmacion`): para quitar un favorito, quitar todos y enviar el formulario.
- **Modal con dark pattern intencional** (`ModalNewsletter`): aparece una vez por sesión a los 6 s de entrar a Explorar. Los patrones usados están comentados en el código.
- **Tailwind CSS** en todo el estilo, responsive con prefijos `sm:`, `md:` y `lg:`, y modo oscuro con toggle.
- **Accesibilidad:** `alt` en imágenes, `role`, `aria-label`, `aria-invalid`, `htmlFor`, HTML semántico, enlace "Saltar al contenido" y título por página.
- **Componentes** en archivos `.tsx` separados (`src/components`).

## Estructura

```
src/
├── components/   # Componentes reutilizables (Navbar, Tarjeta, modales...)
├── context/      # Context de favoritos y de tema
├── hooks/        # useFavoritos, useTema
├── services/     # Llamadas a la API de TVMaze
├── types/        # Tipos de TypeScript
├── utils/        # Funciones de formato
└── views/        # Una vista por ruta
```

## Cómo ejecutarlo

Requiere Node.js 20+ y pnpm.

```bash
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # build de producción en dist/
pnpm preview   # sirve el build localmente
pnpm lint      # oxlint
```

## Despliegue en Vercel

1. Entrar a [vercel.com](https://vercel.com) e importar el repositorio de GitHub.
2. Vercel detecta Vite automáticamente (build: `pnpm build`, salida: `dist`).
3. El archivo `vercel.json` redirige todas las rutas a `index.html` para que funcione recargar en rutas como `/explorar/1`.
