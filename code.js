//

function playerRankUp (points) {
  if (points >= 100) {
    return "Well done! You have advanced to the qualifying stage. Win 2 out of your next 3 games to rank up."
  } else {
    return false
  }
}

//

function sum (numbers) {
   if (numbers.length === 0) {
        return 0;
    }

    return numbers.reduce((sum, current) => sum + current, 0);
}

//


// 
function decArrowPinCode(arrowStr) {
  if (typeof arrowStr !== "string" || arrowStr.length === 0) return [];

  // keypad coordinates (x, y)
  // 7 8 9
  // 4 5 6
  // 1 2 3
  // 0
  const digitToXY = {
    "7": [0, 0], "8": [1, 0], "9": [2, 0],
    "4": [0, 1], "5": [1, 1], "6": [2, 1],
    "1": [0, 2], "2": [1, 2], "3": [2, 2],
    "0": [0, 3],
  };

  const xyToDigit = new Map(Object.entries(digitToXY).map(([d, xy]) => [`${xy[0]},${xy[1]}`, Number(d)]));

  const first = arrowStr[0];
  if (!(first in digitToXY)) return [];

  let [x, y] = digitToXY[first];
  const out = [Number(first)];

  let sawArrow = false;

  const move = (dx, dy) => {
    const nx = x + dx, ny = y + dy;
    const key = `${nx},${ny}`;
    if (!xyToDigit.has(key)) return false;
    x = nx; y = ny;
    out.push(xyToDigit.get(key));
    return true;
  };

  for (let i = 1; i < arrowStr.length; i++) {
    const ch = arrowStr[i];

    if (ch === "→") { sawArrow = true; if (!move(1, 0)) return []; continue; }
    if (ch === "←") { sawArrow = true; if (!move(-1, 0)) return []; continue; }
    if (ch === "↑") { sawArrow = true; if (!move(0, -1)) return []; continue; }
    if (ch === "↓") { sawArrow = true; if (!move(0, 1)) return []; continue; }

    if (ch === "*") {
      // must be followed by a digit 1..9
      if (i + 1 >= arrowStr.length) return [];
      const nChar = arrowStr[i + 1];
      if (nChar < "1" || nChar > "9") return [];
      const n = nChar.charCodeAt(0) - 48;

      // repeat the previous key n times (append same digit n times)
      const last = out[out.length - 1];
      for (let k = 0; k < n; k++) out.push(last);

      i++; // consume the digit after '*'
      continue;
    }

    // any other character (including extra digits) is invalid
    return [];
  }

  // must contain at least one arrow
  if (!sawArrow) return [];

  return out;
}
//

//smarttrim

function smartTrim(text, maxLength = 100) {
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");

  return trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "…";
}

// 22.01.2026


/**
 * Funkcja analyzeNumbers analizuje tablicę liczb i zwraca
 * podstawowe statystyki opisowe.
 *
 * @param {number[]} numbers - Tablica liczb do analizy
 * @returns {Object} Obiekt zawierający:
 *  - min: najmniejszą wartość w tablicy
 *  - max: największą wartość w tablicy
 *  - average: średnią arytmetyczną
 *
 * Jeśli tablica jest pusta, funkcja zwraca null.
 */
function analyzeNumbers(numbers) {
  // Sprawdzamy, czy przekazana wartość jest poprawną, niepustą tablicą
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return null;
  }

  // Obliczamy sumę wszystkich elementów tablicy
  const sum = numbers.reduce((acc, value) => acc + value, 0);

  // Wyznaczamy średnią arytmetyczną
  const average = sum / numbers.length;

  // Wyznaczamy minimum i maksimum
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  // Zwracamy obiekt z wynikami analizy
  return {
    min,
    max,
    average
  };
}

// statystyka
function analyzeNumbers(data) {
  if (!Array.isArray(data)) {
    throw new TypeError("Argument musi być tablicą.");
  }

  const numbers = data.filter(
    x => typeof x === "number" && !Number.isNaN(x)
  );

  if (numbers.length === 0) {
    throw new Error("Brak poprawnych danych liczbowych.");
  }

  const n = numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);

  const mean = sorted.reduce((sum, x) => sum + x, 0) / n;

  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  const variance =
    sorted.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;

  const stdDev = Math.sqrt(variance);

  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;

  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const outliers = sorted.filter(
    x => x < lowerFence || x > upperFence
  );

  return {
    count: n,
    min: sorted[0],
    max: sorted[n - 1],
    mean: Number(mean.toFixed(2)),
    median,
    variance: Number(variance.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    q1,
    q3,
    iqr,
    outliers
  };
}

// statystyka

//finanse - oblicz ratę kredytu

function obliczRateKredytu(kwota, oprocentowanieRoczne, lata) {
  const miesiecznaStopa = oprocentowanieRoczne / 100 / 12;
  const liczbaRat = lata * 12;

  const rata =
    (kwota * miesiecznaStopa) /
    (1 - Math.pow(1 + miesiecznaStopa, -liczbaRat));

  return Number(rata.toFixed(2));
}

// przykład użycia
console.log(obliczRateKredytu(300000, 7.5, 25)); // np. 2215.37

// 06.02

function memoizeWithTTL(fn, ttl = 5000) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, expires } = cache.get(key);
      if (now < expires) {
        return value; // hit z cache 💨
      }
      cache.delete(key); // cache wygasł
    }

    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      expires: now + ttl
    });

    return result;
  };
}

