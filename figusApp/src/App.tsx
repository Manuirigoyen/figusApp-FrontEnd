import { Header } from "./components/home/Header";
import { Footer } from "./components/home/Footer";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * Root application component that renders the main layout structure.
 * Provides the overall application structure with header, main routes, and footer.
 * @returns React component rendering the application layout with Header, AppRoutes, and Footer
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