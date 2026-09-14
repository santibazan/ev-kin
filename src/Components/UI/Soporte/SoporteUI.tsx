import { useState, type FormEvent } from "react";
import styles from "./Soporte.module.css";

export type SoporteFormData = {
  nombre: string;
  email: string;
  telefono: string;
  comentario: string;
};

type SoporteUIProps = {
  title?: string;
  subtitle?: string;
  /** Ej: "+598 94 429 194" (se muestra tal cual, sin formatear). */
  whatsapp?: string;
  email?: string;
  schedule?: string;
  address?: string;
  onSubmit?: (data: SoporteFormData) => void;
};

export default function SoporteUI({
  title = "Atención al cliente",
  subtitle = "Estamos aquí para ayudarte en lo que necesites, contactanos y te responderemos lo antes posible.",
  whatsapp = "+54 9 11 3297 3461",
  email = "aldo.sarelli@kinergiasas.com",
  schedule = "De lunes a viernes: 10:00h - 17:00h",
  address = "Buenos Aires",
  onSubmit,
}: SoporteUIProps) {
  const [form, setForm] = useState<SoporteFormData>({
    nombre: "",
    email: "",
    telefono: "",
    comentario: "",
  });

  function handleChange(
    field: keyof SoporteFormData,
  ): (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (e) => {
      const value = e.currentTarget.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(form);

    const digits = whatsapp.replace(/\D/g, "");
    const mensaje = [
      `Hola, soy ${form.nombre || "un visitante de la web"}.`,
      "",
      form.comentario,
      "",
      `Teléfono: ${form.telefono || "-"}`,
      `Email: ${form.email || "-"}`,
    ].join("\n");

    const url = `https://wa.me/${digits}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.formColumn}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className={styles.input}
                value={form.nombre}
                onChange={handleChange("nombre")}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className={styles.input}
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </div>

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              className={styles.input}
              value={form.telefono}
              onChange={handleChange("telefono")}
            />

            <textarea
              name="comentario"
              placeholder="Comentario"
              className={styles.textarea}
              value={form.comentario}
              onChange={handleChange("comentario")}
              required
            />

            <button type="submit" className={styles.submitBtn}>
              Enviar mensaje
            </button>
          </form>
        </div>

        <div className={styles.infoColumn}>
          <h3 className={styles.infoHeading}>Información de contacto</h3>
          <p className={styles.infoText}>
            Contactá con nosotros a través de los datos que se indican a
            continuación o rellenando el formulario.
          </p>

          <div className={styles.infoBlock}>
            <h4 className={styles.infoLabel}>Datos de contacto</h4>
            <p className={styles.infoLine}>
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                className={styles.infoLink}
              >
                {whatsapp}
              </a>
            </p>
            <p className={styles.infoLine}>
              E-mail:{" "}
              <a href={`mailto:${email}`} className={styles.infoLink}>
                {email}
              </a>
            </p>
          </div>

          <div className={styles.infoBlock}>
            <h4 className={styles.infoLabel}>Horario</h4>
            <p className={styles.infoLine}>{schedule}</p>
          </div>

          <div className={styles.infoBlock}>
            <h4 className={styles.infoLabel}>Local</h4>
            <p className={styles.infoLine}>Ubicación: {address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
