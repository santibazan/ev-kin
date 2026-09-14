import NavbarUI from "../../UI/Header/NavbarUI"
import FooterUI from "../../UI/Footer/FooterUI"
import Hero from "./Hero"
import Beneficios from "./Beneficios"
import ComoFunciona from "./ComoFunciona"

export const LandingScreen = () => {
  return (
    <>
      <NavbarUI />
      <Hero />
      <Beneficios />
      <ComoFunciona />
      <FooterUI />
    </>
  )
}