import { useEffect } from "react";

// import ScrollToTop from "./Components/ScrollToTop";
import { AppRouter } from "./Routes/AppRouter";

function App() {
  useEffect(() => {
    document.body.classList.add("preload");
    const timer = setTimeout(() => {
      document.body.classList.remove("preload");
      document.body.classList.add("loaded");
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <ScrollToTop /> */}
      <AppRouter />
    </>
  );
}

export default App;