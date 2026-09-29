import NavbarUI from "../../UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";
import ProductosUI, { type Product } from "@/Components/UI/Productos/ProductosUI";

import productoBlanco from "../../../Images/product_white.png";
import productoNegro from "../../../Images/product_black.png";

// Cuando tengas modelos nuevos, agregalos a esta lista y arriba de la vitrina
// aparecen pestañas para elegir entre ellos. Las specs, solo con datos reales.
const PRODUCTOS: Product[] = [
  {
    id: "home-pro",
    name: "ev-kin Home 7",
    badge: "Nuevo",
    price: "USD 900",
    originalPrice: "USD 540",
    // specs: [
    //   { label: "Potencia", value: "7,4 kW" },
    //   { label: "Conector", value: "Tipo 2" },
    // ],
    variants: [
      { id: "blanco", label: "Blanco", swatch: "#f4f4f5", image: productoBlanco },
      { id: "negro", label: "Negro", swatch: "#1c1c1f", image: productoNegro },
    ],
  },
  {
    id: "home-pro 2",
    name: "ev-kin Home 7 DLB",
    badge: "Nuevo",
    price: "USD 1000",
    originalPrice: "USD 1200",
    // specs: [
    //   { label: "Potencia", value: "7,4 kW" },
    //   { label: "Conector", value: "Tipo 2" },
    // ],
    variants: [
      { id: "blanco", label: "Blanco", swatch: "#f4f4f5", image: productoBlanco },
      { id: "negro", label: "Negro", swatch: "#1c1c1f", image: productoNegro },
    ],
  },
];

export const ProductosScreen = () => {
  return (
    <>
      <NavbarUI />

      {/* Reemplazá por el WhatsApp real de ev-kin */}
      <ProductosUI products={PRODUCTOS} whatsapp="+54 9 11 3297 3461" />

      <FooterUI />
    </>
  );
};
