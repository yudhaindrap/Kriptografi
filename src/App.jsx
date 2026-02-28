import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFF] font-sans selection:bg-blue-100 selection:text-blue-600">
        {/* Header Sederhana */}
        <header className="p-8 flex justify-between items-center max-w-6xl mx-auto">
          <div className="font-black text-2xl tracking-tighter text-slate-800">
            KRYP<span className="text-blue-500">TO.</span>
          </div>
          <div className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Kalkulator Kriptografi Klasik 2026
          </div>
        </header>

        {/* Konten Halaman */}
        <main className="max-w-6xl mx-auto px-6 pt-5 pb-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calc" element={<Calculator />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Navigasi Melayang */}
        <Navbar />
      </div>
    </Router>
  );
}