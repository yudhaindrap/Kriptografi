import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calculator, BookOpen, User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  // Fungsi untuk mengecek apakah menu sedang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-white/80 backdrop-blur-xl border border-blue-50 px-6 py-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center gap-8 md:gap-12">
        <NavItem 
          to="/" 
          icon={<Home size={22} />} 
          label="Utama" 
          active={isActive("/")} 
        />
        <NavItem 
          to="/calc" 
          icon={<Calculator size={22} />} 
          label="Kalkulator" 
          active={isActive("/calc")} 
        />
        <NavItem 
          to="/profile" 
          icon={<User size={22} />} 
          label="Profil" 
          active={isActive("/profile")} 
        />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link to={to} className="relative group flex flex-col items-center gap-1">
      <motion.div
        animate={{ 
          scale: active ? 1.1 : 1,
          color: active ? "#3b82f6" : "#94a3b8" 
        }}
        className={`transition-colors duration-300 ${active ? "text-blue-500" : "text-slate-400 group-hover:text-blue-400"}`}
      >
        {icon}
      </motion.div>
      
      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-400"}`}>
        {label}
      </span>

      {/* Indikator Dot Aktif */}
      {active && (
        <motion.div
          layoutId="nav-dot"
          className="absolute -bottom-2 w-1 h-1 bg-blue-500 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}