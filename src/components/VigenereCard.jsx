import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, 
  Type, 
  Sparkles, 
  Copy, 
  Trash2, 
  AlertCircle,
  Hash
} from "lucide-react";
import { vigenereProcess } from "../utils/vigenere";

export default function VigenereCard({ mode }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("standard");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Menjalankan proses otomatis saat input atau mode berubah (opsional)
  // Atau tetap menggunakan tombol manual sesuai keinginanmu
  const handleProcess = () => {
    try {
      if (!text || !key) throw new Error("Text dan Key harus diisi!");
      setError("");
      const isDecrypt = mode === "decrypt";
      const output = vigenereProcess(text, key, type, isDecrypt);
      setResult(output);
    } catch (err) {
      setError(err.message);
      setResult("");
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      // Kamu bisa tambah toast notification di sini
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Konfigurasi & Key */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
          <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tighter">
            <div className="p-2 bg-blue-500 text-white rounded-xl">
              <Hash size={18} />
            </div>
            Vigenere Config
          </div>

          {/* Vigenere Type Switcher */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Type size={12} /> Method Type
            </label>
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setType("standard")}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                  type === "standard" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setType("autokey")}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                  type === "autokey" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                }`}
              >
                Autokey
              </button>
            </div>
          </div>

          {/* Key Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Key size={12} /> Secret Key
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Contoh: KRYPTO"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 placeholder:text-slate-300"
            />
          </div>

          <button
            onClick={handleProcess}
            className="w-full bg-blue-500 text-white py-5 rounded-[1.5rem] font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            {mode === "encrypt" ? "ENCRYPT" : "DECRYPT"} NOW <Sparkles size={18} />
          </button>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Kolom Kanan: Input & Output */}
      <div className="lg:col-span-2 space-y-6">
        {/* Input Area */}
        <div className="bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden">
          <div className="p-3 flex items-center justify-between border-b border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
              {mode === "encrypt" ? "Plaintext Input" : "Ciphertext Input"}
            </span>
            <button 
              onClick={() => setText("")} 
              className="text-slate-300 hover:text-red-400 transition-colors p-2 hover:bg-red-50 rounded-xl"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan pesan rahasia kamu di sini..."
            className="w-full p-4 focus:outline-none text-slate-600 font-medium text-lg leading-relaxed resize-none bg-transparent"
          ></textarea>
        </div>

        {/* Output Area */}
        <div className="bg-slate-800 p-2 rounded-[2.5rem] shadow-2xl relative">
          <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Result Output
            </span>
            <button
              onClick={copyResult}
              className="bg-slate-700 text-slate-300 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all group"
            >
              <Copy size={18} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
          <div className="p-8 min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white font-mono text-xl break-all leading-loose tracking-wider"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-500 font-medium italic">
                  Menunggu input untuk diproses...
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}