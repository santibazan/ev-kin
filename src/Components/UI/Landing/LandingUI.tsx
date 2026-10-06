import Hero from "./Hero";
import Beneficios from "./Beneficios";
import ComoFunciona from "./ComoFunciona";
import ScrollToTop from "../Scroll/ScrollToTop";
import MarcaUI from "./MarcaUI";

export default function LandingUI() {
  return (
    <>
      <Hero />
      {/* El "Descubrí más" del hero baja hasta acá */}
      <div id="contenido">
      <MarcaUI />
        <Beneficios />
        <ComoFunciona />
      </div>
      <ScrollToTop />
    </>
  );
}