import { Header } from "./components/home/Header";
import { Footer } from "./components/home/Footer";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;