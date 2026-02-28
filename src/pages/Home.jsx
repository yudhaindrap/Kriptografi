import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Zap, 
  ShieldAlert 
} from "lucide-react";

export default function Home() {
  // Data fitur untuk ditampilkan di grid
  const features = [
    { icon: <Lock size={20} />, title: "Vigenere", desc: "Polyalphabetic Substitution" },
    { icon: <Zap size={20} />, title: "Affine", desc: "Linear Mathematical Mapping" },
    { icon: <Cpu size={20} />, title: "Hill", desc: "Linear Algebra Matrix 2x2 & 3x3" },
    { icon: <ShieldCheck size={20} />, title: "Playfair", desc: "5x5 Digraphic Substitution" },
    { icon: <ShieldAlert size={20} />, title: "Enigma", desc: "WWII Rotor Machine Logic" },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-50 text-blue-500 p-4 rounded-[2rem] shadow-sm border border-blue-100"
        >
          <ShieldCheck size={40} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight leading-tight">
            Security. <br />
            <span className="text-blue-500">Simplified.</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-lg font-medium leading-relaxed">
            Platform kalkulator kriptografi klasik untuk tugas Matakuliah Kriptografi Semester Genap 2025/2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/calc"
            className="bg-blue-500 text-white px-10 py-5 rounded-2xl font-black tracking-wider shadow-xl shadow-blue-200 hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center gap-3"
          >
            MULAI SEKARANG <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Algorithm Feature Grid */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
          >
            <div className="text-blue-400 bg-blue-50 p-3 rounded-2xl">
              {item.icon}
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-sm">{item.title}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}