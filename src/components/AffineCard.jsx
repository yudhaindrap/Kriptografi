import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Variable, 
  Binary, 
  Sparkles, 
  Copy, 
  Trash2, 
  AlertCircle,
  Info
} from "lucide-react";
import { affineProcess } from "../utils/affine";

export default function AffineCard({ mode }) {
  const [text, setText] = useState("");
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    try {
      if (!text) throw new Error("Masukkan teks terlebih dahulu!");
      setError("");
      const isDecrypt = mode === "decrypt";
      // Pastikan a dan b diproses sebagai angka
      const output = affineProcess(text, parseInt(a), parseInt(b), isDecrypt);
      setResult(output);
    } catch (err) {
      setError(err.message);
      setResult("");
    }
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Konfigurasi Matematika */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
          <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tighter">
            <div className="p-2 bg-blue-500 text-white rounded-xl">
              <Variable size={18} />
            </div>
            Affine Parameters
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Input Key A */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                <Binary size={12} /> Key A
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700"
              />
            </div>

            {/* Input Key B */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                <Binary size={12} /> Key B
              </label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Info Matematika */}
          <div className="bg-blue-50/50 p-4 rounded-2xl flex gap-3 items-start">
            <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
              Kunci <span className="font-bold">a</span> harus relatif prima dengan <span className="font-bold text-blue-600">95</span> agar proses dekripsi berhasil. Contoh: 3, 7, 11, 17, dst.
            </p>
          </div>

          <button
            onClick={handleProcess}
            className="w-full bg-blue-500 text-white py-5 rounded-[1.5rem] font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            {mode === "encrypt" ? "CALCULATE" : "SOLVE"} NOW <Sparkles size={18} />
          </button>
        </div>

        {/* Error Handling */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
        <div className="bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden">
          <div className="p-3 flex items-center justify-between border-b border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
              {mode === "encrypt" ? "Plaintext" : "Ciphertext"} Data
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
            placeholder="Ketik pesan yang akan diproses..."
            className="w-full p-8 focus:outline-none text-slate-600 font-medium text-lg leading-relaxed resize-none bg-transparent"
          ></textarea>
        </div>

        <div className="bg-slate-800 p-2 rounded-[2.5rem] shadow-2xl relative">
          <div className="p-4 flex items-center justify-between border-b border-slate-700/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Output Stream
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white font-mono text-xl break-all leading-loose tracking-wider"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-500 font-medium italic">
                  Hasil pemrosesan linear akan muncul di sini...
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}