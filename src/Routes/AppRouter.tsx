import { Route } from "react-router";
import { Routes } from "react-router";

import { ProductosScreen } from "@/Components/Screens/Productos/ProductoScreen";
import { LandingScreen } from "@/Components/Screens/Landing/LandingScreen";
import { PreguntasScreen } from "@/Components/Screens/Preguntas/PreguntasScreen";
// import { NosotrosScreen } from "@/Components/Screens/Nosotros/NosotrosScreen";
import { TiendaScreen } from "@/Components/Screens/Tienda/TiendaScreen";
import { SoporteScreen } from "@/Components/Screens/Soporte/SoporteScreen";
import { BlogScreen } from "@/Components/Screens/Blog/BlogScreen";
import { InstalacionScreen } from "@/Components/Screens/Instalacion/InstalacionScreen";
import { CasaVsRedScreen } from "@/Components/Screens/Blog/CasaVsRedScreen";
import { AntesDeInstalarScreen } from "@/Components/Screens/Blog/AntesDeInstalarScreen";
import { TiempoDeCargaScreen } from "@/Components/Screens/Blog/TiempoDeCargaScreen";
import { TiposDeCargadoresScreen } from "@/Components/Screens/Blog/TipoDeCargadoresScreen";


export const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/productos" element={<ProductosScreen />} />
        <Route path="/preguntas" element={<PreguntasScreen />} />
        {/* <Route path="/nosotros" element={<NosotrosScreen />} /> */}
        <Route path="/tienda" element={<TiendaScreen />} />
        <Route path="/soporte" element={<SoporteScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
        <Route path="/instalacion" element={<InstalacionScreen />} />
        <Route path="/blog/casa-o-red-publica" element={<CasaVsRedScreen />} />
        <Route path="/blog/antes-de-instalar" element={<AntesDeInstalarScreen />} />
        <Route path="/blog/tiempo-de-carga" element={<TiempoDeCargaScreen />} />
        <Route path="/blog/tipos-de-cargadores" element={<TiposDeCargadoresScreen />} />
        
      </Route>
    </Routes>
  );
};
