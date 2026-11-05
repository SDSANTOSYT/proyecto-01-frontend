import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Inicio from "./views/Inicio";
import Explorar from "./views/Explorar";
import Detalle from "./views/Detalle";
import Favoritos from "./views/Favoritos";
import Contacto from "./views/Contacto";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="explorar" element={<Explorar />} />
        <Route path="explorar/:id" element={<Detalle />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
