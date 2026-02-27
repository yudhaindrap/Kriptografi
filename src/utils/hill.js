const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Membersihkan teks: hanya huruf A-Z
 */
function clean(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

/**
 * Mencari Invers Perkalian Modular (a^-1 mod m)
 */
function modInverse(a, m = 26) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

/**
 * Menghitung Determinan Matriks (Mendukung 2x2 dan 3x3)
 */
function getDeterminant(m) {
  if (m.length === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else if (m.length === 3) {
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  }
  return 0;
}

/**
 * Mencari Invers Matriks Modular mod 26
 */
function getInverseMatrix(m) {
  const det = getDeterminant(m);
  const detInv = modInverse(det, 26);

  if (detInv === null) return null;

  const size = m.length;
  let adj = [];

  if (size === 2) {
    // Adjoin untuk 2x2: tukar posisi diagonal utama, beri negatif diagonal samping
    adj = [
      [m[1][1], -m[0][1]],
      [-m[1][0], m[0][0]]
    ];
  } else if (size === 3) {
    // Adjoin untuk 3x3: Transpose dari matriks kofaktor
    adj = [
      [
        (m[1][1] * m[2][2] - m[1][2] * m[2][1]),
        -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
        (m[0][1] * m[1][2] - m[0][2] * m[1][1])
      ],
      [
        -(m[1][0] * m[2][2] - m[1][2] * m[2][0]),
        (m[0][0] * m[2][2] - m[0][2] * m[2][0]),
        -(m[0][0] * m[1][2] - m[0][2] * m[1][0])
      ],
      [
        (m[1][0] * m[2][1] - m[1][1] * m[2][0]),
        -(m[0][0] * m[2][1] - m[0][1] * m[2][0]),
        (m[0][0] * m[1][1] - m[0][1] * m[1][0])
      ]
    ];
  }

  // Kalikan Adjoin dengan detInv dan lakukan mod 26
  return adj.map(row =>
    row.map(val => ((val % 26) * detInv % 26 + 26) % 26)
  );
}

/**
 * FUNGSI UTAMA: Hill Process
 * @param {string} text - Pesan input
 * @param {Array[]} matrix - Matriks kunci (2x2 atau 3x3)
 * @param {string} mode - "encrypt" atau "decrypt"
 */
export function hillProcess(text, matrix, mode = "encrypt") {
  const n = matrix.length; // Ukuran matriks (2 atau 3)
  let cleanText = clean(text);

  // Padding: pastikan panjang teks kelipatan n
  while (cleanText.length % n !== 0) {
    cleanText += "X";
  }

  let workingMatrix = matrix;

  if (mode === "decrypt") {
    workingMatrix = getInverseMatrix(matrix);
    if (!workingMatrix) {
      throw new Error("Matriks tidak memiliki invers mod 26 (Determinan tidak relatif prima dengan 26).");
    }
  }

  let result = "";

  // Proses per blok (n huruf)
  for (let i = 0; i < cleanText.length; i += n) {
    // Ambil vektor huruf
    let vector = [];
    for (let j = 0; j < n; j++) {
      vector.push(ALPHABET.indexOf(cleanText[i + j]));
    }

    // Perkalian Matriks x Vektor
    for (let row = 0; row < n; row++) {
      let sum = 0;
      for (let col = 0; col < n; col++) {
        sum += workingMatrix[row][col] * vector[col];
      }
      result += ALPHABET[((sum % 26) + 26) % 26];
    }
  }

  return result;
}