import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import imgLogoMark from "../../../Images/logo-mark.png";
import styles from "./Hero.module.css";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.img
          src={imgLogoMark}
          alt="ev-kin"
          className={styles.logoMark}
          variants={item}
        />

        <motion.h1 className={styles.heading} variants={item}>
          Cargá. Andá. Repetí.
        </motion.h1>

        <motion.p className={styles.paragraph} variants={item}>
          Carga eléctrica inteligente para tu día a día — en casa, en el trabajo, en el camino
        </motion.p>

        <motion.div className={styles.ctaRow} variants={item}>
          <motion.a
            href="/productos"
            className={styles.primaryButton}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            Empezar ahora
            <ArrowRight className={styles.primaryIcon} />
          </motion.a>
          <motion.a
            href="/preguntas"
            className={styles.secondaryButton}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            Conocer más
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
