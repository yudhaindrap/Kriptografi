/**
 * Membersihkan teks: Hanya A-Z, ubah J menjadi I
 */
function clean(text) {
  return text.toUpperCase()
    .replace(/J/g, "I") // Standar Playfair: J dianggap I
    .replace(/[^A-Z]/g, "");
}

/**
 * Membuat matriks 5x5 berdasarkan kunci
 */
export function generateMatrix5x5(key) {
  const cleanKey = clean(key);
  const chars = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Tanpa 'J'
  let used = new Set();
  let matrix = [];

  for (let char of (cleanKey + chars)) {
    if (!used.has(char)) {
      used.add(char);
      matrix.push(char);
    }
  }

  let grid = [];
  for (let i = 0; i < 25; i += 5) {
    grid.push(matrix.slice(i, i + 5));
  }
  return grid;
}

function findPos(matrix, char) {
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      if (matrix[r][c] === char) return [r, c];
  return [0, 0];
}

/**
 * Menyiapkan teks (Bigrams) dengan aturan 'X' filler yang cerdas
 */
function prepare(text) {
  let cleanText = clean(text);
  let result = "";
  
  for (let i = 0; i < cleanText.length; i++) {
    result += cleanText[i];
    
    // Jika ada huruf kembar dalam satu pasangan bigram
    if (i + 1 < cleanText.length && cleanText[i] === cleanText[i + 1]) {
      // Gunakan 'X' sebagai filler, kecuali jika huruf kembarnya adalah 'X', gunakan 'Q'
      result += (cleanText[i] === "X" ? "Q" : "X");
    }
  }
  
  // Jika panjang total ganjil, tambahkan filler di akhir
  if (result.length % 2 !== 0) {
    result += (result[result.length - 1] === "X" ? "Q" : "X");
  }
  return result;
}

/**
 * Fungsi Utama Playfair Process
 */
export function playfairProcess(text, key, mode = "encrypt") {
  const matrix = generateMatrix5x5(key);
  const preparedText = mode === "encrypt" ? prepare(text) : clean(text);
  
  let result = "";
  // Shift 1 untuk enkripsi, Shift 4 untuk dekripsi (mod 5)
  let shift = mode === "encrypt" ? 1 : 4;

  for (let i = 0; i < preparedText.length; i += 2) {
    let char1 = preparedText[i];
    let char2 = preparedText[i + 1];
    
    let [r1, c1] = findPos(matrix, char1);
    let [r2, c2] = findPos(matrix, char2);

    if (r1 === r2) {
      // Baris yang sama
      result += matrix[r1][(c1 + shift) % 5];
      result += matrix[r2][(c2 + shift) % 5];
    } else if (c1 === c2) {
      // Kolom yang sama
      result += matrix[(r1 + shift) % 5][c1];
      result += matrix[(r2 + shift) % 5][c2];
    } else {
      // Membentuk persegi
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }
  return result;
}