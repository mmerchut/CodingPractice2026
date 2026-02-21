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

//finanse

/**
 * Rozbudowany kalkulator kredytu: harmonogram, nadpłaty, raty stałe/malejące.
 *
 * Założenia:
 * - Oprocentowanie nominalne w skali roku (APR) z kapitalizacją miesięczną: r = APR/12
 * - Daty są opcjonalne (możesz je dodać w UI), tu liczymy per okres (miesiąc).
 *
 * @param {Object} params
 * @param {number} params.principal - kwota kredytu (kapitał początkowy)
 * @param {number} params.apr - oprocentowanie nominalne roczne, np. 0.09 dla 9%
 * @param {number} params.termMonths - liczba miesięcy
 * @param {"annuity"|"decreasing"} [params.type="annuity"] - raty stałe lub malejące
 * @param {"reduce_payment"|"reduce_term"} [params.prepaymentMode="reduce_term"]
 *        - jak traktować nadpłaty (obniż ratę / skróć okres)
 * @param {Array<{month:number, amount:number}>} [params.prepayments=[]]
 *        - nadpłaty jednorazowe: np. [{month: 12, amount: 5000}]
 * @param {Object} [params.recurringPrepayment]
 * @param {number} params.recurringPrepayment.startMonth - od którego miesiąca (1..)
 * @param {number} params.recurringPrepayment.amount - kwota nadpłaty co miesiąc
 * @param {number} [params.recurringPrepayment.endMonth] - do którego miesiąca włącznie
 * @param {number} [params.feeUpfront=0] - prowizja na start (kwotowo)
 * @param {number} [params.insuranceMonthly=0] - stały koszt miesięczny (np. ubezpieczenie)
 * @returns {{
 *   schedule: Array<{
 *     month:number,
 *     payment:number,
 *     principalPaid:number,
 *     interestPaid:number,
 *     prepayment:number,
 *     fees:number,
 *     balance:number
 *   }>,
 *   summary: {
 *     totalPaid:number,
 *     totalInterest:number,
 *     totalPrepaid:number,
 *     totalFees:number,
 *     months:number,
 *     effectiveAPRApprox:number
 *   }
 * }}
 */
function buildLoanSchedule(params) {
  const {
    principal,
    apr,
    termMonths,
    type = "annuity",
    prepaymentMode = "reduce_term",
    prepayments = [],
    recurringPrepayment,
    feeUpfront = 0,
    insuranceMonthly = 0
  } = params;

  if (!(principal > 0)) throw new Error("principal musi być > 0");
  if (!(apr >= 0)) throw new Error("apr musi być >= 0");
  if (!(termMonths > 0 && Number.isFinite(termMonths))) throw new Error("termMonths musi być > 0");

  const r = apr / 12; // miesięczna stopa
  const prepayMap = new Map();
  for (const p of prepayments) {
    if (!p || !(p.month >= 1) || !(p.amount > 0)) continue;
    prepayMap.set(p.month, (prepayMap.get(p.month) || 0) + p.amount);
  }

  const getRecurringPrepay = (m) => {
    if (!recurringPrepayment) return 0;
    const { startMonth, amount, endMonth } = recurringPrepayment;
    if (!(amount > 0) || !(startMonth >= 1)) return 0;
    if (m < startMonth) return 0;
    if (endMonth != null && m > endMonth) return 0;
    return amount;
  };

  // rata annuitetowa dla salda B i pozostałych n miesięcy
  const annuityPayment = (B, n) => {
    if (n <= 0) return 0;
    if (r === 0) return B / n;
    const pow = Math.pow(1 + r, n);
    return B * (r * pow) / (pow - 1);
  };

  let balance = principal;
  let month = 0;

  // Na start dodajemy koszt prowizji jako „fee” w miesiącu 0 do podsumowania (nie jako rata)
  let totalFees = feeUpfront;
  let totalInterest = 0;
  let totalPaid = feeUpfront; // zakładamy, że prowizja jest zapłacona z kieszeni
  let totalPrepaid = 0;

  const schedule = [];

  // Dla rat malejących: stała część kapitałowa bazowo = principal/termMonths
  // ale przy trybie reduce_payment/term i nadpłatach trzeba przeliczać.
  let basePrincipalPart = type === "decreasing" ? (principal / termMonths) : null;

  // Początkowa rata (dla annuity)
  let currentPayment = type === "annuity" ? annuityPayment(balance, termMonths) : null;

  // Maksymalny bezpieczny limit iteracji (np. ogromne skrócenie okresu)
  const maxIters = termMonths + 600;

  while (balance > 1e-8 && month < maxIters) {
    month += 1;

    // Odsetki naliczane od salda na początek okresu
    const interest = balance * r;

    // Nadpłata w tym miesiącu (jednorazowa + cykliczna)
    const prepay = (prepayMap.get(month) || 0) + getRecurringPrepay(month);

    let payment = 0;
    let principalPaid = 0;
    let interestPaid = interest;

    if (type === "annuity") {
      // rata stała (może być przeliczana po nadpłacie w zależności od trybu)
      payment = currentPayment;
      principalPaid = payment - interestPaid;

      // Korekta, gdy końcówka kredytu
      if (principalPaid > balance) {
        principalPaid = balance;
        payment = principalPaid + interestPaid;
      }
    } else if (type === "decreasing") {
      // rata malejąca: część kapitałowa zasadniczo stała, ale:
      // - jeśli reduce_term: zostawiamy część kapitałową i skracamy okres
      // - jeśli reduce_payment: przeliczamy część kapitałową na nowo dla pozostałych miesięcy
      if (prepaymentMode === "reduce_payment") {
        // przelicz bazową część kapitałową na pozostałe miesiące (zależnie od tego ile zostało)
        // szacujemy pozostałe miesiące jako (termMonths - month + 1), ale jeśli skróciliśmy wcześniej, to i tak pętla się skończy wcześniej
        const remainingGuess = Math.max(1, termMonths - month + 1);
        basePrincipalPart = balance / remainingGuess;
      }
      principalPaid = Math.min(basePrincipalPart, balance);
      payment = principalPaid + interestPaid;
    } else {
      throw new Error("Nieznany typ rat: " + type);
    }

    // Opłaty miesięczne (np. ubezpieczenie)
    const fees = insuranceMonthly;

    // Aktualizacja salda po racie
    balance = balance - principalPaid;

    // Następnie nadpłata (nie powinna przekroczyć salda)
    const prepayApplied = Math.min(prepay, balance);
    balance = balance - prepayApplied;

    // Sumy
    totalInterest += interestPaid;
    totalFees += fees;
    totalPrepaid += prepayApplied;
    totalPaid += payment + fees + prepayApplied;

    schedule.push({
      month,
      payment: round2(payment),
      principalPaid: round2(principalPaid),
      interestPaid: round2(interestPaid),
      prepayment: round2(prepayApplied),
      fees: round2(fees),
      balance: round2(balance)
    });

    // Przeliczenia po nadpłacie:
    if (type === "annuity") {
      if (prepaymentMode === "reduce_payment") {
        // obniż ratę, utrzymując pierwotny horyzont (mniej więcej)
        const remaining = Math.max(1, termMonths - month);
        currentPayment = annuityPayment(balance, remaining);
      } else {
        // reduce_term: rata zostaje taka sama, a skróci się okres (pętla zakończy się wcześniej)
        // currentPayment bez zmian
      }
    } else if (type === "decreasing") {
      // dla decreasing i reduce_term nic nie trzeba, bo i tak płacimy stały kapitał, okres sam się skróci
      // dla reduce_payment przeliczamy bazę na nowo w kolejnym obrocie (już wyżej)
    }
  }

  // Przybliżone "effective APR" (bardzo uproszczone) jako IRR miesięczny przepływów -> roczny
  // Cashflow: t=0: +principal (dostajesz), potem: - (payment+fees+prepay)
  const cashflows = [principal - feeUpfront];
  for (const row of schedule) cashflows.push(-(row.payment + row.fees + row.prepayment));
  const irrMonthly = xirrMonthlyApprox(cashflows);
  const effectiveAPRApprox = irrMonthly != null ? (Math.pow(1 + irrMonthly, 12) - 1) : null;

  return {
    schedule,
    summary: {
      totalPaid: round2(totalPaid),
      totalInterest: round2(totalInterest),
      totalPrepaid: round2(totalPrepaid),
      totalFees: round2(totalFees),
      months: schedule.length,
      effectiveAPRApprox: effectiveAPRApprox == null ? null : round6(effectiveAPRApprox)
    }
  };
}

/** Proste IRR (miesięczne) metodą bisekcji dla równych odstępów czasu */
function xirrMonthlyApprox(cashflows) {
  // Szukamy r w (-0.99, 10) czyli -99%..1000% miesięcznie
  let lo = -0.99, hi = 10;
  const npv = (rate) => cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0);

  let fLo = npv(lo), fHi = npv(hi);
  // brak zmiany znaku -> nie umiemy znaleźć
  if (!Number.isFinite(fLo) || !Number.isFinite(fHi) || fLo * fHi > 0) return null;

  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid);
    if (!Number.isFinite(fMid)) return null;
    if (Math.abs(fMid) < 1e-9) return mid;
    if (fLo * fMid <= 0) {
      hi = mid; fHi = fMid;
    } else {
      lo = mid; fLo = fMid;
    }
  }
  return (lo + hi) / 2;
}

function round2(x) { return Math.round((x + Number.EPSILON) * 100) / 100; }
function round6(x) { return Math.round((x + Number.EPSILON) * 1e6) / 1e6; }

// --- PRZYKŁAD UŻYCIA ---
const result = buildLoanSchedule({
  principal: 300000,
  apr: 0.085,     
  termMonths: 360,
  type: "annuity",
  prepaymentMode: "reduce_term",
  prepayments: [{ month: 12, amount: 20000 }, { month: 24, amount: 15000 }],
  recurringPrepayment: { startMonth: 1, amount: 300, endMonth: 60 },
  feeUpfront: 2000,
  insuranceMonthly: 50
});

console.log(result.summary);
console.log(result.schedule.slice(0, 3)); // pierwsze 3 miesiące