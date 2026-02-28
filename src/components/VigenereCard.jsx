import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, 
  Type, 
  Zap, 
  Copy, 
  Trash2, 
  AlertCircle,
  Settings2,
  Check
} from "lucide-react";
import { vigenereProcess } from "../utils/vigenere";

export default function VigenereCard({ mode }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("standard");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      if (!text || !key) throw new Error("Teks dan Kunci harus diisi!");
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sisi Kiri: Konfigurasi (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
            <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tight">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Settings2 size={20} />
              </div>
              Pengaturan Vigenere
            </div>

            {/* Pemilih Tipe Metode */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Type size={14} /> Metode Sandi
              </label>
              <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                <button
                  onClick={() => setType("standard")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                    type === "standard" 
                    ? "bg-white text-blue-600 shadow-sm border border-blue-50" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  STANDAR
                </button>
                <button
                  onClick={() => setType("autokey")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                    type === "autokey" 
                    ? "bg-white text-blue-600 shadow-sm border border-blue-50" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  AUTOKEY
                </button>
              </div>
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
                placeholder="Contoh: SEMARANG"
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700 placeholder:text-slate-300 uppercase"
              />
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
            >
              {mode === "encrypt" ? "PROSES ENKRIPSI" : "PROSES DEKRIPSI"} 
              <Zap size={18} fill="currentColor" />
            </button>
          </div>

          {/* Pesan Kesalahan */}
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
          
          {/* Kotak Input Pesan */}
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden focus-within:shadow-md transition-all">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
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
              placeholder="Ketik atau tempelkan pesan rahasia Anda di sini..."
              className="w-full p-6 h-40 focus:outline-none text-slate-700 font-medium text-lg leading-relaxed resize-none bg-transparent placeholder:text-slate-200"
            />
          </div>

          {/* Kotak Hasil Pengolahan */}
          <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-blue-100 p-2">
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Hasil Pengolahan
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
            <div className="px-6 pb-8 pt-2 min-h-[100px] flex items-center">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-800 font-mono text-xl break-all leading-relaxed tracking-tight"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-300 font-medium italic text-sm">
                  Tunggu sebentar, hasil akan tampil di sini setelah diproses...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}