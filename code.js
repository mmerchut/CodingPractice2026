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