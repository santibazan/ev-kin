// Screens/Blog/AntesDeInstalarScreen.tsx
import NavbarUI from "@/Components/UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";

import portada from "../../../Images/blog-cover-2.jpg";
import ArticuloTiempoDeCarga from "@/Components/UI/Blog/TiempoDeCarga/ArticuloTiempoDeCarga";

export const TiempoDeCargaScreen = () => (
  <>
    <NavbarUI />
    <ArticuloTiempoDeCarga cover={portada} whatsapp="+54 9 11 2631-4831" />
    <FooterUI />
  </>
);