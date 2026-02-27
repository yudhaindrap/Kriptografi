import { motion } from "framer-motion";
import { Book, Info } from "lucide-react";

const ciphers = [
  {
    name: "Vigenere Cipher",
    desc: "Metode enkripsi alfabet menggunakan deretan sandi Caesar yang berbeda berdasarkan huruf-huruf pada kata kunci. Termasuk dalam kategori substitusi polialfabetik.",
  },
  {
    name: "Affine Cipher",
    desc: "Sandi substitusi monoalfabetik di mana setiap huruf dipetakan ke setara numeriknya, dienkripsi menggunakan fungsi matematika linear sederhana (ax + b) mod 26.",
  },
  {
    name: "Playfair Cipher",
    desc: "Teknik enkripsi simetris pertama yang menggunakan substitusi digraf (pasangan huruf) dengan bantuan matriks 5x5.",
  },
  {
    name: "Hill Cipher",
    desc: "Sandi substitusi polialfabetik yang didasarkan pada aljabar linear. Menggunakan matriks sebagai kunci enkripsi dan dekripsi.",
  },
  {
    name: "Enigma Cipher",
    desc: "Mesin enkripsi polialfabetik yang digunakan Jerman pada Perang Dunia II. Menggunakan sistem rotor yang berputar untuk mengubah pemetaan huruf setiap kali tombol ditekan.",
  }
];

export default function Education() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-800 mb-4">Library Edukasi</h1>
        <p className="text-slate-500">Pelajari dasar matematika di balik setiap algoritma.</p>
      </div>

      <div className="grid gap-6">
        {ciphers.map((c, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-500"><Book size={24} /></div>
              <h3 className="text-xl font-bold text-slate-800">{c.name}</h3>
            </div>
            <p className="text-slate-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}