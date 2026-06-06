import { Header } from "./components/home/Header";
import { Footer } from "./components/home/Footer";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * Componente raíz de la aplicación.
 * 
 * @returns Layout principal de la aplicación.
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