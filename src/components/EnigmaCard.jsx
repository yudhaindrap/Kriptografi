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
  Hash
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

  const clean = (t) => t.toUpperCase().replace(/[^A-Z]/g, "");

  const handleProcess = () => {
    setError("");
    if (!text) return setError("Masukkan pesan terlebih dahulu.");
    if (positions.length !== 3) return setError("Rotor position harus 3 huruf.");
    if (rings.length !== 3) return setError("Ring setting harus 3 huruf.");

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
      setError("Konfigurasi Enigma tidak valid.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* KIRI: Physical Machine Configuration (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-black text-slate-800 uppercase tracking-tighter">
              <div className="p-2 bg-blue-500 text-white rounded-xl">
                <Settings size={18} />
              </div>
              Machine Setup
            </div>
            <button 
              onClick={() => {setPositions("AAA"); setRings("AAA"); setPlugboard("");}}
              className="text-slate-400 hover:text-blue-500 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Rotor Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Selected Rotors</label>
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
                  className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  {Object.keys(ENIGMA_CONFIG.ROTORS).map((r) => (
                    <option key={r} value={r}>Rotor {r}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          {/* Rotor Pos & Ring Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Positions</label>
              <input
                type="text"
                maxLength={3}
                value={positions}
                onChange={(e) => setPositions(clean(e.target.value))}
                placeholder="AAA"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center font-mono font-black tracking-[0.5em] text-blue-600 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Ring Settings</label>
              <input
                type="text"
                maxLength={3}
                value={rings}
                onChange={(e) => setRings(clean(e.target.value))}
                placeholder="AAA"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center font-mono font-black tracking-[0.5em] text-slate-600 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Plugboard */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Plugboard Pairs</label>
            <input
              type="text"
              value={plugboard}
              onChange={(e) => setPlugboard(e.target.value.toUpperCase())}
              placeholder="AB CD EF..."
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm font-bold text-slate-600 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Reflector */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Reflector Type</label>
            <select
              value={reflectorKey}
              onChange={(e) => setReflectorKey(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 outline-none appearance-none"
            >
              {Object.keys(ENIGMA_CONFIG.REFLECTORS).map((ref) => (
                <option key={ref} value={ref}>Reflector {ref}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleProcess}
            className="w-full bg-slate-800 text-white py-5 rounded-[1.5rem] font-black tracking-[0.2em] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 uppercase text-xs"
          >
            Engage Mechanism <Zap size={16} fill="currentColor" />
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold">
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* KANAN: Text Panel (7 Columns) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden">
          <div className="p-3 flex items-center justify-between border-b border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
              <Cpu size={14} /> Intelligence Input
            </span>
            <button onClick={() => setText("")} className="text-slate-300 hover:text-red-400 p-2"><Trash2 size={18} /></button>
          </div>
          <textarea
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your classified message..."
            className="w-full p-8 focus:outline-none text-slate-600 font-medium text-lg leading-relaxed resize-none bg-transparent"
          ></textarea>
        </div>

        <div className="bg-blue-600 p-2 rounded-[2.5rem] shadow-2xl shadow-blue-200 relative">
          <div className="p-4 flex items-center justify-between border-b border-blue-500/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Encrypted / Decrypted Signal</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-400 transition-all">
              <Copy size={18} />
            </button>
          </div>
          <div className="p-8 min-h-[160px] flex items-center">
            {result ? (
              <p className="text-white font-mono text-2xl break-all leading-loose tracking-[0.15em] uppercase w-full">
                {result}
              </p>
            ) : (
              <p className="text-blue-200 font-medium italic opacity-60">Ready for signal processing...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}