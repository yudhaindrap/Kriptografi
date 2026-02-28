import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Cpu, 
  Zap, 
  RotateCcw, 
  Copy, 
  Trash2, 
  AlertCircle,
  Layers,
  Check,
  ZapOff
} from "lucide-react";
import { enigmaProcess, ENIGMA_CONFIG } from "../utils/enigma";

export default function EnigmaCard() {
  const [text, setText] = useState("");
  const [selectedRotors, setSelectedRotors] = useState(["I", "II", "III"]);
  const [positions, setPositions] = useState("AAA");
  const [rings, setRings] = useState("AAA");
  const [plugboard, setPlugboard] = useState("");
  const [reflectorKey, setReflectorKey] = useState("B");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const clean = (t) => t.toUpperCase().replace(/[^A-Z]/g, "");

  const handleProcess = () => {
    setError("");
    if (!text) return setError("Silakan masukkan pesan terlebih dahulu.");
    if (positions.length !== 3) return setError("Posisi rotor harus 3 huruf (contoh: ABC).");
    if (rings.length !== 3) return setError("Ring setting harus 3 huruf (contoh: AAA).");

    try {
      const output = enigmaProcess(text, {
        selectedRotors,
        positions,
        rings,
        plugboard,
        reflectorKey
      });
      setResult(output);
    } catch (err) {
      setError("Konfigurasi Enigma tidak valid. Periksa pasangan plugboard Anda.");
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetConfig = () => {
    setPositions("AAA");
    setRings("AAA");
    setPlugboard("");
    setResult("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SISI KIRI: Konfigurasi Mesin (5 Kolom) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tight">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                  <Settings size={20} />
                </div>
                Konfigurasi Mesin
              </div>
              <button 
                onClick={resetConfig}
                className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                title="Reset ke Awal"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Pemilihan Rotor */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Layers size={14} /> Urutan Rotor (Kiri - Kanan)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <select
                    key={i}
                    value={selectedRotors[i]}
                    onChange={(e) => {
                      const newRotors = [...selectedRotors];
                      newRotors[i] = e.target.value;
                      setSelectedRotors(newRotors);
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
                  >
                    {Object.keys(ENIGMA_CONFIG.ROTORS).map((r) => (
                      <option key={r} value={r}>Rotor {r}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Posisi & Ring Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Posisi Awal</label>
                <input
                  type="text"
                  maxLength={3}
                  value={positions}
                  onChange={(e) => setPositions(clean(e.target.value))}
                  placeholder="AAA"
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl text-center font-mono font-black tracking-[0.4em] text-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all uppercase"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Ring Setting</label>
                <input
                  type="text"
                  maxLength={3}
                  value={rings}
                  onChange={(e) => setRings(clean(e.target.value))}
                  placeholder="AAA"
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl text-center font-mono font-black tracking-[0.4em] text-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all uppercase"
                />
              </div>
            </div>

            {/* Plugboard */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Pasangan Plugboard</label>
              <input
                type="text"
                value={plugboard}
                onChange={(e) => setPlugboard(e.target.value.toUpperCase())}
                placeholder="CONTOH: AB CD EF"
                className="w-full p-4 bg-slate-50 border-none rounded-2xl font-mono text-sm font-bold text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* Reflector */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tipe Reflektor</label>
              <select
                value={reflectorKey}
                onChange={(e) => setReflectorKey(e.target.value)}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-black text-slate-600 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 appearance-none"
              >
                {Object.keys(ENIGMA_CONFIG.REFLECTORS).map((ref) => (
                  <option key={ref} value={ref}>Reflektor Tipe {ref}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 uppercase text-xs"
            >
              Jalankan Mekanisme <Zap size={18} fill="currentColor" className="text-yellow-400" />
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SISI KANAN: Panel Teks (7 Kolom) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden focus-within:shadow-md transition-all">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <Cpu size={16} /> Pesan Intelijen
              </span>
              <button 
                onClick={() => {setText(""); setResult("");}} 
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ketik pesan rahasia di sini... (Hanya huruf A-Z yang akan diproses)"
              className="w-full p-8 h-64 focus:outline-none text-slate-700 font-medium text-lg leading-relaxed resize-none bg-transparent placeholder:text-slate-200"
            />
          </div>

          {/* Output Sinyal Enigma */}
          <div className="bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-200 overflow-hidden">
            <div className="px-8 py-5 flex items-center justify-between border-b border-blue-500/50">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Sinyal Terenkripsi / Dekripsi
              </span>
              {result && (
                <button
                  onClick={copyResult}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${
                    copied ? "bg-white text-green-600" : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Tersalin" : "Salin Sinyal"}
                </button>
              )}
            </div>
            <div className="p-10 min-h-[180px] flex items-center">
              {result ? (
                <motion.p
                  key={result}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white font-mono text-2xl break-all leading-relaxed tracking-[0.2em] uppercase w-full"
                >
                  {result}
                </motion.p>
              ) : (
                <div className="flex flex-col gap-2 opacity-40">
                  <p className="text-blue-100 font-medium italic">Menunggu sinyal masuk...</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-1 w-8 bg-blue-300 rounded-full" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}