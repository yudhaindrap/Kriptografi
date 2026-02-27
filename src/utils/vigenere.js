const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function clean(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

/**
 * Vigenere Engine Pro
 * @param {string} text - Plaintext atau Ciphertext
 * @param {string} key - Kata kunci
 * @param {string} type - "standard" atau "autokey"
 * @param {boolean} isDecrypt - true untuk dekripsi
 */
export function vigenereProcess(text, key, type = "standard", isDecrypt = false) {
  const t = clean(text);
  const k = clean(key);
  if (!k) throw new Error("Key wajib diisi");

  let result = "";
  let currentKeyStream = k;

  for (let i = 0; i < t.length; i++) {
    // Ambil karakter kunci saat ini
    let charK;
    if (type === "standard") {
      charK = k[i % k.length];
    } else {
      // Logic untuk Autokey
      charK = currentKeyStream[i];
    }

    const mIdx = ALPHABET.indexOf(t[i]);
    const kIdx = ALPHABET.indexOf(charK);

    let resIdx;
    if (!isDecrypt) {
      // ENKRIPSI: (P + K) mod 26
      resIdx = (mIdx + kIdx) % 26;
      // Jika autokey, tambahkan karakter plaintext yang baru saja diproses ke stream kunci
      if (type === "autokey") currentKeyStream += t[i];
    } else {
      // DEKRIPSI: (C - K + 26) mod 26
      resIdx = (mIdx - kIdx + 26) % 26;
      // Jika autokey, tambahkan hasil dekripsi (plaintext) ke stream kunci untuk karakter berikutnya
      if (type === "autokey") currentKeyStream += ALPHABET[resIdx];
    }

    result += ALPHABET[resIdx];
  }

  return result;
}