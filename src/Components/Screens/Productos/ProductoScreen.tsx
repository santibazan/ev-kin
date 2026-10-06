import NavbarUI from "../../UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";
import ProductosUI from "@/Components/UI/Productos/ProductosUI";


export const ProductosScreen = () => {
  return (
    <>
      <NavbarUI />

      {/* Reemplazá por el WhatsApp real de ev-kin */}
      <ProductosUI whatsapp="+54 9 11 2631-4831" />

      <FooterUI />
    </>
  );
};
