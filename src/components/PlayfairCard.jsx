import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grid3X3, 
  Key, 
  Zap, 
  Copy, 
  Trash2, 
  AlertCircle,
  Eye,
  Settings2,
  Check
} from "lucide-react";
import { playfairProcess, generateMatrix5x5 } from "../utils/playfair";

export default function PlayfairCard({ mode }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Menghasilkan matriks 5x5 secara otomatis saat kunci diketik
  const matrix = useMemo(() => {
    if (!key) return null;
    try {
      return generateMatrix5x5(key);
    } catch (e) {
      return null;
    }
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
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sisi Kiri: Konfigurasi & Matriks (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-6">
            <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tight">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Settings2 size={20} />
              </div>
              Pengaturan Playfair
            </div>

            {/* Input Kata Kunci */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Key size={14} /> Kata Kunci Rahasia
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Contoh: KUNCI123"
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700 uppercase"
              />
            </div>

            {/* Visualisasi Matriks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Eye size={14} /> Pratinjau Matriks
                </label>
                <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-tighter">Grid 5 x 5</span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100 min-h-[220px] flex items-center justify-center">
                {matrix ? (
                  <div className="grid grid-cols-5 gap-1.5 w-full">
                    {matrix.flat().map((char, index) => (
                      <motion.div
                        key={`${char}-${index}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.005 }}
                        className="aspect-square flex items-center justify-center bg-white border border-blue-50 rounded-xl text-[12px] font-mono font-black text-blue-600 shadow-sm"
                      >
                        {char}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-3 p-6">
                    <Grid3X3 size={32} className="text-slate-200" strokeWidth={1.5} />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      Masukkan kunci untuk<br/>membuat matriks
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 uppercase"
            >
              {mode === "encrypt" ? "Mulai Enkripsi" : "Mulai Dekripsi"} 
              <Zap size={18} fill="currentColor" />
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sisi Kanan: Input & Hasil (3 Kolom) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Kotak Input */}
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden focus-within:shadow-md transition-all">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {mode === "encrypt" ? "Pesan Asli" : "Pesan Terenkripsi"}
              </span>
              <button 
                onClick={() => { setText(""); setResult(""); }} 
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks di sini (Playfair mendukung huruf dan angka)..."
              className="w-full p-6 h-48 focus:outline-none text-slate-700 font-medium text-lg leading-relaxed resize-none bg-transparent placeholder:text-slate-200"
            />
          </div>

          {/* Kotak Hasil */}
          <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-blue-100 p-2">
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Hasil Pemrosesan Matriks
              </span>
              {result && (
                <button
                  onClick={copyResult}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${
                    copied ? "bg-green-500 text-white shadow-md" : "bg-white text-blue-500 shadow-sm hover:bg-blue-50"
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Berhasil Salin" : "Salin Hasil"}
                </button>
              )}
            </div>
            <div className="px-6 pb-8 pt-2 min-h-[120px] flex items-center">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-800 font-mono text-xl break-all leading-loose tracking-[0.15em] uppercase"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-300 font-medium italic text-sm">
                  Gunakan matriks di samping untuk mengolah pesan Anda...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}