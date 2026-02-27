const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const ENIGMA_CONFIG = {
  ROTORS: {
    I:   { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
    II:  { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
    III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" },
    IV:  { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J" },
    V:   { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z" },
  },
  REFLECTORS: {
    B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    C: "FVPJIAOYEDRZRKGXUSSHBLMTQV",
  }
};

export function enigmaProcess(text, config) {
  const { selectedRotors, positions, rings, plugboard, reflectorKey } = config;
  
  let pos = positions.toUpperCase().split("").map(c => ALPHABET.indexOf(c));
  let ringArr = rings.toUpperCase().split("").map(c => ALPHABET.indexOf(c));
  let r1 = ENIGMA_CONFIG.ROTORS[selectedRotors[0]];
  let r2 = ENIGMA_CONFIG.ROTORS[selectedRotors[1]];
  let r3 = ENIGMA_CONFIG.ROTORS[selectedRotors[2]];
  let reflector = ENIGMA_CONFIG.REFLECTORS[reflectorKey];

  // Map plugboard pairs
  const pbMap = {};
  plugboard.toUpperCase().split(" ").forEach(pair => {
    if (pair.length === 2) {
      pbMap[pair[0]] = pair[1];
      pbMap[pair[1]] = pair[0];
    }
  });

  return text.toUpperCase().replace(/[^A-Z]/g, "").split("").map(char => {
    // 1. Step Rotors (Double Stepping Logic)
    if (pos[1] === ALPHABET.indexOf(r2.notch)) {
      pos[1] = (pos[1] + 1) % 26;
      pos[2] = (pos[2] + 1) % 26;
    } else if (pos[0] === ALPHABET.indexOf(r1.notch)) {
      pos[1] = (pos[1] + 1) % 26;
    }
    pos[0] = (pos[0] + 1) % 26;

    // 2. Plugboard IN
    let c = pbMap[char] || char;
    let s = ALPHABET.indexOf(c);

    // 3. Forward (R1 -> R2 -> R3)
    s = rotorStep(s, r1, pos[0], ringArr[0], false);
    s = rotorStep(s, r2, pos[1], ringArr[1], false);
    s = rotorStep(s, r3, pos[2], ringArr[2], false);

    // 4. Reflector
    s = ALPHABET.indexOf(reflector[s]);

    // 5. Backward (R3 -> R2 -> R1)
    s = rotorStep(s, r3, pos[2], ringArr[2], true);
    s = rotorStep(s, r2, pos[1], ringArr[1], true);
    s = rotorStep(s, r1, pos[0], ringArr[0], true);

    // 6. Plugboard OUT
    let outChar = ALPHABET[s];
    return pbMap[outChar] || outChar;
  }).join("");
}

function rotorStep(v, rotor, p, r, inverse) {
  let shift = (p - r + 26) % 26;
  if (!inverse) {
    let input = (v + shift) % 26;
    let output = ALPHABET.indexOf(rotor.wiring[input]);
    return (output - shift + 26) % 26;
  } else {
    let input = (v + shift) % 26;
    let output = rotor.wiring.indexOf(ALPHABET[input]);
    return (output - shift + 26) % 26;
  }
}