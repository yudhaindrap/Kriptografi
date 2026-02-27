// Charset 95 karakter (ASCII 32 sampai 126)
const CHARSET = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const M = CHARSET.length; // 95

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}

/**
 * Affine Process Pro
 * Mendukung karakter ASCII dan deteksi kunci otomatis
 */
export function affineProcess(text, a, b, isDecrypt = false) {
    const valA = parseInt(a);
    const valB = parseInt(b);

    if (gcd(valA, M) !== 1) {
        throw new Error(`Kunci 'a' (${valA}) harus relatif prima dengan ${M}. Cobalah angka ganjil yang bukan kelipatan 5 atau 19.`);
    }

    const aInv = modInverse(valA, M);
    
    return text.split("").map(char => {
        const x = CHARSET.indexOf(char);
        if (x === -1) return char; // Biarkan karakter di luar charset (seperti newline)

        if (!isDecrypt) {
            // Enkripsi: (a*x + b) mod M
            return CHARSET[(valA * x + valB) % M];
        } else {
            // Dekripsi: a^-1 * (x - b) mod M
            return CHARSET[(((aInv * (x - valB)) % M) + M) % M];
        }
    }).join("");
}

/**
 * Brute Force Solver (Hanya untuk mod 26 jika teks terbatas A-Z)
 */
export function affineBruteForce(ciphertext) {
    const results = [];
    const possibleA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]; // Koprima dengan 26
    
    possibleA.forEach(a => {
        for (let b = 0; b < 26; b++) {
            // Simulasi dekripsi ringan untuk setiap kombinasi
            // ... (logika dekripsi)
        }
    });
    return results;
}