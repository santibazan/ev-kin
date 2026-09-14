import { Route } from "react-router";
import { Routes } from "react-router";

import { ProductosScreen } from "@/Components/Screens/Productos/ProductoScreen";
import { LandingScreen } from "@/Components/Screens/Landing/LandingScreen";
import { PreguntasScreen } from "@/Components/Screens/Preguntas/PreguntasScreen";
import { NosotrosScreen } from "@/Components/Screens/Nosotros/NosotrosScreen";
import { TiendaScreen } from "@/Components/Screens/Tienda/TiendaScreen";
import { SoporteScreen } from "@/Components/Screens/Soporte/SoporteScreen";


export const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/productos" element={<ProductosScreen />} />
        <Route path="/preguntas" element={<PreguntasScreen />} />
        <Route path="/nosotros" element={<NosotrosScreen />} />
        <Route path="/tienda" element={<TiendaScreen />} />
        <Route path="/soporte" element={<SoporteScreen />} />
      </Route>
    </Routes>
  );
};
