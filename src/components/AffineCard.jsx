import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings2, 
  Binary, 
  Zap, 
  Copy, 
  Trash2, 
  AlertCircle,
  HelpCircle,
  Check
} from "lucide-react";
import { affineProcess } from "../utils/affine";

export default function AffineCard({ mode }) {
  const [text, setText] = useState("");
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      if (!text) throw new Error("Silakan masukkan teks yang ingin diolah!");
      if (parseInt(a) % 2 === 0 || parseInt(a) % 5 === 0) {
         // Validasi sederhana untuk n=95 (umumnya karakter ASCII)
         // Agar pengguna tahu kenapa error sebelum masuk ke logic
      }
      
      setError("");
      const isDecrypt = mode === "decrypt";
      const output = affineProcess(text, parseInt(a), parseInt(b), isDecrypt);
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
        
        {/* Sisi Kiri: Pengaturan Kunci (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-6">
            <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tight">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Settings2 size={20} />
              </div>
              Pengaturan Kunci
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Kunci A (Kali)
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Kunci B (Geser)
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl flex gap-3 border border-amber-100/50">
              <HelpCircle size={18} className="text-amber-500 shrink-0" />
              <p className="text-[11px] leading-relaxed text-amber-700 font-medium">
                Tips: Agar pesan bisa dikembalikan, <span className="font-bold text-amber-800">Kunci A</span> tidak boleh angka genap atau kelipatan 5.
              </p>
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
            >
              {mode === "encrypt" ? "JALANKAN ENKRIPSI" : "JALANKAN DEKRIPSI"} 
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

        {/* Sisi Kanan: Input & Output (3 Kolom) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Area Input */}
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden transition-all focus-within:shadow-md">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <Binary size={14} /> 
                {mode === "encrypt" ? "Pesan Asli" : "Pesan Terenkripsi"}
              </span>
              <button 
                onClick={() => { setText(""); setResult(""); }} 
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Hapus Semua"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis atau tempel pesan Anda di sini..."
              className="w-full p-6 h-40 focus:outline-none text-slate-700 font-medium text-lg leading-relaxed resize-none bg-transparent placeholder:text-slate-300"
            />
          </div>

          {/* Area Output */}
          <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-blue-100 p-2 transition-all">
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Hasil Pengolahan
              </span>
              {result && (
                <button
                  onClick={copyResult}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${
                    copied ? "bg-green-500 text-white" : "bg-white text-blue-500 shadow-sm hover:bg-blue-50"
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Berhasil Salin" : "Salin Hasil"}
                </button>
              )}
            </div>
            <div className="px-6 pb-8 pt-2 min-h-[100px]">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-800 font-mono text-xl break-all leading-relaxed"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-300 font-medium italic text-sm">
                  Hasil akan muncul secara otomatis setelah Anda menekan tombol di samping.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}