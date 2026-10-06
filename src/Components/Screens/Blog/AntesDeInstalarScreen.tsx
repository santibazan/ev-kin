// Screens/Blog/AntesDeInstalarScreen.tsx
import NavbarUI from "@/Components/UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";

import portada from "../../../Images/blog-cover-2.jpg";
import ArticuloAntesDeInstalar from "@/Components/UI/Blog/InstalarEnCasa/ArticuloAntesDeInstalar";

export const AntesDeInstalarScreen = () => (
  <>
    <NavbarUI />
    <ArticuloAntesDeInstalar cover={portada} whatsapp="+54 9 11 2631-4831" />
    <FooterUI />
  </>
);