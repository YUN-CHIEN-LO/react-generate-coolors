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
const genRandomColorHex = () =>
  `#${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}`;

export const genRandomColors = (allColors) => {
  return allColors.map((x) => ({
    ...x,
    colorHex: x.locked ? x.colorHex : genRandomColorHex(),
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
