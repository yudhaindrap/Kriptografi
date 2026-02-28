import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Lock, Unlock, Zap, ChevronRight } from "lucide-react";

// Import Cards
import VigenereCard from "../components/VigenereCard";
import AffineCard from "../components/AffineCard";
import PlayfairCard from "../components/PlayfairCard";
import HillCard from "../components/HillCard";
import EnigmaCard from "../components/EnigmaCard";

export default function Calculator() {
  const [algorithm, setAlgorithm] = useState("vigenere");
  const [mode, setMode] = useState("encrypt");

  const algorithms = [
    { id: "vigenere", label: "Vigenere" },
    { id: "affine", label: "Affine" },
    { id: "playfair", label: "Playfair" },
    { id: "hill", label: "Hill" },
    { id: "enigma", label: "Enigma" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10"
    >
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight">
          Kalkulator{" "}
          <span className="text-black">Krip</span>
          <span className="text-blue-500">To.</span>
        </h1>
      </div>

      {/* Algorithm Selector (Modern Chips) */}
      <div className="flex flex-wrap justify-center gap-3">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => setAlgorithm(algo.id)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
              algorithm === algo.id
                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200"
                : "bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:text-blue-400"
            }`}
          >
            {algo.label}
          </button>
        ))}
      </div>

      {/* Control Panel: Mode Switcher */}
      <div className="flex justify-center">
        <div className="bg-white p-1.5 rounded-[2rem] border border-blue-50 shadow-sm flex items-center gap-2">
          <button
            onClick={() => setMode("encrypt")}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${
              mode === "encrypt" 
              ? "bg-blue-50 text-blue-600 shadow-inner" 
              : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <Lock size={16} /> Enkripsi
          </button>
          <div className="w-[1px] h-6 bg-slate-100" />
          <button
            onClick={() => setMode("decrypt")}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${
              mode === "decrypt" 
              ? "bg-blue-50 text-blue-600 shadow-inner" 
              : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <Unlock size={16} /> Dekripsi
          </button>
        </div>
      </div>

      {/* Dynamic Card Display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={algorithm + mode}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {algorithm === "vigenere" && <VigenereCard mode={mode} />}
            {algorithm === "affine" && <AffineCard mode={mode} />}
            {algorithm === "playfair" && <PlayfairCard mode={mode} />}
            {algorithm === "hill" && <HillCard mode={mode} />}
            {algorithm === "enigma" && <EnigmaCard mode={mode} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint Footer */}
      <div className="flex justify-center items-center gap-2 text-slate-300">
        <Zap size={14} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Yudha Indra Praja - 21120123140143 - Kriptografi C
        </span>
      </div>
    </motion.div>
  );
}