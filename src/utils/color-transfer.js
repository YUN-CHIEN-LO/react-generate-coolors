const Hex2Hsl = (H) => {
  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + H[1] + H[2];
  g = "0x" + H[3] + H[4];
  b = "0x" + H[5] + H[6];

  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    H: h,
    S: s,
    L: l,
  };
};
const Hsl2Hex = ({ H, S, L }) => {
  let h = H;
  let s = S / 100;
  let l = L / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
};
const colorTransfer = {
  Hex2Hsl: Hex2Hsl,
  Hsl2Hex: Hsl2Hex,
  findAverage: (c1, c2) => {
    console.log(c1 + ", " + c2);
    const { H: h1, S: s1, L: l1 } = Hex2Hsl(c1);
    const { H: h2, S: s2, L: l2 } = Hex2Hsl(c2);

    const gradientDegree = 0.5;

    const lerp = (start, end, weight) => {
      return start * (1 - weight) + end * weight;
    };

    return Hsl2Hex({
      H: lerp(h1, h2, gradientDegree),
      S: lerp(s1, s2, gradientDegree),
      L: lerp(l1, l2, gradientDegree),
    });
  },
  lightenColor: (color) => {
    const { H, L, S } = Hex2Hsl(color);
    return Hsl2Hex({ H, S, L: L - 12 > 0 ? L - 12 : 0 });
  },
  darkenColor: (color) => {
    const { H, L, S } = Hex2Hsl(color);
    return Hsl2Hex({ H, S, L: L + 12 < 100 ? L + 12 : 100 });
  },
  textColor: (color) => {
    const { H, L, S } = Hex2Hsl(color);
    return Hex2Hsl(Hsl2Hex({ H, S: 0, L })).L < 50 ? "#ffffff" : "#000000";
  },
};

export default colorTransfer;
