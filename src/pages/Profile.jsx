import { motion } from "framer-motion";
import { User, Mail, Github, ExternalLink } from "lucide-react";

export default function Profile() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-blue-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-400 to-blue-600"></div>
        
        <div className="relative mt-12">
          <div className="w-32 h-32 bg-white rounded-full mx-auto p-1 shadow-xl">
             <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                <User size={64} className="text-slate-300" />
             </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Yudha Indra Praja</h3>
            <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">NIM. 21120123140143</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Mata Kuliah</p>
                <p className="text-xs font-bold text-slate-700">Kriptografi</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Semester</p>
                <p className="text-xs font-bold text-slate-700">Genap 2025/2026</p>
             </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <a 
              href="https://github.com/yudhaindrap" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 text-white rounded-2xl hover:scale-110 transition-transform"
            >
              <Github size={20}/>
            </a>

            <a 
              href="https://link-website-kamu.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-blue-500 text-white rounded-2xl hover:scale-110 transition-transform"
            >
              <ExternalLink size={20}/>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}