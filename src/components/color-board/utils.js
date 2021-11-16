export const DEFAULT_COLOR = [
  {
    id: 0,
    color: "#D4AFB9",
    locked: false,
    shaded: false,
  },
  {
    id: 1,
    color: "#d1cfe2",
    locked: false,
    shaded: false,
  },
  {
    id: 2,
    color: "#9cadce",
    locked: false,
    shaded: false,
  },
  {
    id: 3,
    color: "#7ec4cf",
    locked: false,
    shaded: false,
  },
  {
    id: 4,
    color: "#52b2cf",
    locked: false,
    shaded: false,
  },
];
const HEXS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const randHex = () => HEXS[Math.floor(Math.random() * HEXS.length)];
const genRandomcolor = () =>
  `#${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}`;

export const genRandomColors = (allColors) => {
  return allColors.map((x) => ({
    ...x,
    color: x.locked ? x.color : genRandomcolor(),
  }));
};

export const toggleLock = (arr, id) => {
  return arr.map((x) => {
    return {
      ...x,
      locked: x.id === id ? !x.locked : x.locked,
    };
  });
};

export const showShade = (arr, id) => {
  return arr.map((x) => {
    return {
      ...x,
      shaded: x.id === id ? true : x.shaded,
    };
  });
};

export const hideShade = (arr) => {
  return arr.map((x) => {
    return {
      ...x,
      shaded: false,
    };
  });
};

export const replaceColor = (arr, id, hex) => {
  return arr.map((x) => {
    return {
      ...x,
      color: x.id === id ? hex : x.color,
    };
  });
};
