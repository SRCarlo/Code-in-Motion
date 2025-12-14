import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SortingVisualizer from "./components/SortingVisualizer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-2 md:p-4">
        <SortingVisualizer />
      </main>
      <Footer />
    </div>
  );
}
