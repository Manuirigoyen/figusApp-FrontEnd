import { Header } from "./components/home/Header";
import { Footer } from "./components/home/Footer";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * Componente raíz de la aplicación que renderiza la estructura principal del layout.
 * Proporciona la arquitectura general con encabezado, rutas principales y pie de página.
 * * @returns Componente de React que renderiza el layout de la aplicación con Header, AppRoutes y Footer.
 */
function App() {
  return (
    <>
      <Header />
      <div>
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;