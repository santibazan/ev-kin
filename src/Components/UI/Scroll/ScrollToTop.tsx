import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`${styles.button} ${visible ? styles.show : ""}`}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Volver arriba"
    >
      <span className={styles.icon}>
        <ArrowUp size={20} strokeWidth={1.4} />
      </span>
    </button>
  );
}
