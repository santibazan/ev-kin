import Hero from "./Hero";
import Beneficios from "./Beneficios";
import ComoFunciona from "./ComoFunciona";
import ScrollToTop from "../Scroll/ScrollToTop";

export default function LandingUI() {
  return (
    <>
      <Hero />
      {/* El "Descubrí más" del hero baja hasta acá */}
      <div id="contenido">
        <Beneficios />
        <ComoFunciona />
      </div>
      <ScrollToTop />
    </>
  );
}