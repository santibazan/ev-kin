import NavbarUI from "../../UI/Header/NavbarUI";
import FooterUI from "@/Components/UI/Footer/FooterUI";
import ProductosUI from "@/Components/UI/Productos/ProductosUI";
import styles from "./ProductosScreen.module.css";

import productoBlanco from "../../../Images/product_white.png";
import productoNegro from "../../../Images/product_black.png";

export const ProductosScreen = () => {
  return (
    <>
      <NavbarUI />

      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros productos</h2>
          <p className={styles.subtitle}>
            Cargadores diseñados para tu casa o tu negocio, con la potencia y
            confiabilidad que tu auto eléctrico necesita.
          </p>
        </div>

        <div className={styles.grid}>
          <ProductosUI
            title="ev-kin Home Pro"
            // description="Con pantalla color y cable conectado para alimentar tu auto eléctrico de forma sencilla."
            image={<img src={productoBlanco} alt="ev-kin Home Pro Blanco" />}
            badge="Nuevo"
            originalPrice="USD 540"
            price="USD 458"
          />

          <ProductosUI
            title="ev-kin Home Pro (negro)"
            // description="La misma potencia y confiabilidad, en versión negra para combinar con cualquier fachada."
            image={<img src={productoNegro} alt="ev-kin Home Pro Negro" />}
            price="USD 458"
          />
        </div>
      </section>

      <FooterUI />
    </>
  );
};
