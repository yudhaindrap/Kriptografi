import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grid3X3, 
  Key, 
  Sparkles, 
  Copy, 
  Trash2, 
  AlertCircle,
  Eye
} from "lucide-react";
import { playfairProcess, generateMatrix5x5 } from "../utils/playfair";

export default function PlayfairCard({ mode }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Menghasilkan matriks 5x5 berdasarkan kunci
  const matrix = useMemo(() => {
    if (!key) return null;
    return generateMatrix5x5(key);
  }, [key]);

  const handleProcess = () => {
    try {
      if (!text || !key) throw new Error("Teks dan Kunci wajib diisi!");
      setError("");
      const output = playfairProcess(text, key, mode);
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
      {/* Kolom Kiri: Matrix Preview & Key */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
          <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tighter">
            <div className="p-2 bg-blue-500 text-white rounded-xl">
              <Grid3X3 size={18} />
            </div>
            Playfair Matrix
          </div>

          {/* Key Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Key size={12} /> Secret Key (A-Z, 0-9)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Contoh: CIPHER2026"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 uppercase"
            />
          </div>

          {/* Matrix Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Eye size={12} /> Matrix Preview
              </label>
              <span className="text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">5 x 5 Grid</span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100">
              {matrix ? (
                <div className="grid grid-cols-5 gap-1.5">
                  {matrix.flat().map((char, index) => (
                    <motion.div
                      key={`${char}-${index}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className="aspect-square flex items-center justify-center bg-white border border-blue-50 rounded-lg text-[10px] font-mono font-black text-slate-600 shadow-sm"
                    >
                      {char}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-300 space-y-2">
                  <Grid3X3 size={24} strokeWidth={1} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-center">Input Key untuk<br/>melihat matriks</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleProcess}
            className="w-full bg-blue-500 text-white py-5 rounded-[1.5rem] font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            EXECUTE {mode.toUpperCase()} <Sparkles size={18} />
          </button>
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Kolom Kanan: Input & Result Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Input Box */}
        <div className="bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-sm">
          <div className="p-3 flex items-center justify-between border-b border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
              {mode === "encrypt" ? "Plaintext" : "Ciphertext"} Stream
            </span>
            <button 
              onClick={() => setText("")} 
              className="text-slate-300 hover:text-red-400 transition-colors p-2 hover:bg-red-50 rounded-xl"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan teks di sini (Playfair 6x6 mendukung huruf dan angka)..."
            className="w-full p-4 focus:outline-none text-slate-600 font-medium text-lg leading-relaxed resize-none bg-transparent"
          ></textarea>
        </div>

        {/* Result Box */}
        <div className="bg-slate-800 p-2 rounded-[2.5rem] shadow-2xl relative">
          <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Processed Output
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
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-white font-mono text-xl break-all leading-loose tracking-widest uppercase"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-500 font-medium italic">
                  Gunakan matriks di samping untuk memproses data...
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}