import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, 
  Table, 
  Zap, 
  Copy, 
  Trash2, 
  AlertCircle,
  LayoutGrid,
  Settings2,
  Check,
  HelpCircle
} from "lucide-react";
import { hillProcess } from "../utils/hill";

export default function HillCard({ mode }) {
  const [text, setText] = useState("");
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrixInput, setMatrixInput] = useState("3 3\n2 5");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const defaultMatrix2 = "3 3\n2 5";
  const defaultMatrix3 = "6 24 1\n13 16 10\n20 17 15";

  const parseMatrix = () => {
    const rows = matrixInput.trim().split("\n");
    return rows.map(row =>
      row.trim().split(/\s+/).map(Number)
    );
  };

  const handleProcess = () => {
    try {
      setError("");
      if (!text) throw new Error("Silakan masukkan teks terlebih dahulu!");
      
      const matrix = parseMatrix();

      if (matrix.length !== matrixSize || matrix.some(r => r.length !== matrixSize)) {
        throw new Error(`Format matriks tidak valid! Harus ${matrixSize}x${matrixSize}`);
      }

      const output = hillProcess(text, matrix, mode);
      setResult(output);
    } catch (err) {
      setError(err.message);
      setResult("");
    }
  };

  const handleSizeChange = (size) => {
    setMatrixSize(size);
    setMatrixInput(size === 2 ? defaultMatrix2 : defaultMatrix3);
    setResult("");
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
        
        {/* Sisi Kiri: Konfigurasi Matriks (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
            <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tight">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Settings2 size={20} />
              </div>
              Pengaturan Matriks
            </div>

            {/* Pemilih Ukuran (Dimensi) */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <LayoutGrid size={14} /> Dimensi Matriks
              </label>
              <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                {[2, 3].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                      matrixSize === size 
                      ? "bg-white text-blue-600 shadow-sm border border-blue-50" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {size} x {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Input Matriks Angka */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Box size={14} /> Angka Kunci (Matriks)
              </label>
              <div className="relative">
                <textarea
                  value={matrixInput}
                  onChange={(e) => setMatrixInput(e.target.value)}
                  rows={matrixSize === 2 ? 3 : 4}
                  className="w-full p-6 bg-slate-900 text-blue-400 font-mono text-lg rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed tracking-widest"
                  placeholder="3 3&#10;2 5"
                />
                <div className="absolute top-4 right-4 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                  {matrixSize}x{matrixSize} Mode
                </div>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-2xl flex gap-3 border border-blue-100/50">
                <HelpCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                  Pisahkan angka dengan <span className="font-bold">spasi</span> untuk kolom dan <span className="font-bold">Enter</span> untuk baris baru.
                </p>
              </div>
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 uppercase"
            >
              Proses Matriks <Zap size={18} fill="currentColor" />
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

        {/* Sisi Kanan: Input Teks & Hasil (3 Kolom) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Input Area */}
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden focus-within:shadow-md transition-all">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Input Pesan (Vektor)
              </span>
              <button 
                onClick={() => { setText(""); setResult(""); }} 
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Bersihkan"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks alfabet yang ingin diproses..."
              className="w-full p-6 h-44 focus:outline-none text-slate-700 font-medium text-lg leading-relaxed resize-none bg-transparent placeholder:text-slate-200"
            />
          </div>

          {/* Result Canvas */}
          <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-blue-100 p-2">
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Hasil Perkalian Matriks ({mode === "encrypt" ? "Enkripsi" : "Dekripsi"})
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
            <div className="px-6 pb-8 pt-2 min-h-[140px] flex items-center">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-slate-800 font-mono text-xl break-all leading-relaxed tracking-wider uppercase"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-300 font-medium italic text-sm">
                  Silakan konfigurasikan matriks di samping dan masukkan pesan untuk melihat hasil.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}