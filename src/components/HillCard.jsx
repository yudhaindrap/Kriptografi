import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, 
  Table, 
  Sparkles, 
  Copy, 
  Trash2, 
  AlertCircle,
  LayoutGrid
} from "lucide-react";
import { hillProcess } from "../utils/hill";

export default function HillCard({ mode }) {
  const [text, setText] = useState("");
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrixInput, setMatrixInput] = useState("3 3\n2 5");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

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
      if (!text) throw new Error("Masukkan teks terlebih dahulu!");
      
      const matrix = parseMatrix();

      if (matrix.length !== matrixSize || matrix.some(r => r.length !== matrixSize)) {
        throw new Error(`Format matriks tidak sesuai! Harus ${matrixSize}x${matrixSize}`);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Matriks & Ukuran */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-8">
          <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tighter">
            <div className="p-2 bg-blue-500 text-white rounded-xl">
              <Table size={18} />
            </div>
            Matrix Config
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <LayoutGrid size={12} /> Dimension
            </label>
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              {[2, 3].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                    matrixSize === size ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                  }`}
                >
                  {size} x {size}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Input Area */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Box size={12} /> Matrix Key (Numbers)
            </label>
            <div className="relative group">
              <textarea
                value={matrixInput}
                onChange={(e) => setMatrixInput(e.target.value)}
                rows={matrixSize === 2 ? 3 : 4}
                className="w-full p-6 bg-slate-900 text-blue-400 font-mono text-lg rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed tracking-widest"
                placeholder="3 3&#10;2 5"
              />
              <div className="absolute top-4 right-4 text-[8px] font-bold text-slate-600 uppercase tracking-widest pointer-events-none">
                {matrixSize}x{matrixSize} Matrix
              </div>
            </div>
            <p className="px-2 text-[10px] text-slate-400 italic">
              *Pisahkan antar kolom dengan spasi dan baris dengan enter.
            </p>
          </div>

          <button
            onClick={handleProcess}
            className="w-full bg-blue-500 text-white py-5 rounded-[1.5rem] font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 uppercase"
          >
            Compute Matrix <Sparkles size={18} />
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

      {/* Kolom Kanan: Input & Terminal Output */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden">
          <div className="p-3 flex items-center justify-between border-b border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
              Input Vector
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
            placeholder="Masukkan teks alfabet..."
            className="w-full p-4 focus:outline-none text-slate-600 font-medium text-lg leading-relaxed resize-none bg-transparent"
          ></textarea>
        </div>

        {/* Terminal Result */}
        <div className="bg-slate-800 p-2 rounded-[2.5rem] shadow-2xl relative">
          <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {mode.toUpperCase()} RESULT
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="bg-slate-700 text-slate-300 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all group"
            >
              <Copy size={18} />
            </button>
          </div>
          <div className="p-8 min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white font-mono text-xl break-all leading-loose tracking-widest"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-slate-500 font-medium italic">
                  Gunakan matriks {matrixSize}x{matrixSize} di samping untuk memproses...
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}