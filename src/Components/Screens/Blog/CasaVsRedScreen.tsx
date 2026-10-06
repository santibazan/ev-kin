// Screens/Blog/CasaVsRedScreen.tsx
import NavbarUI from "@/Components/UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";
import portada from "../../../Images/blog-cover-1.jpg";
import ArticuloCasaVsRedUI from "@/Components/UI/Blog/CargarEnCasavsRed/ArticuloCasaVsRedUI";

export const CasaVsRedScreen = () => (
  <>
    <NavbarUI />
    <ArticuloCasaVsRedUI cover={portada} whatsapp="+54 9 11 2631-4831" />
    <FooterUI />
  </>
);
