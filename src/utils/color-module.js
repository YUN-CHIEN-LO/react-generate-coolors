import colorTransfer from "./color-transfer";
const { findAverage, darkenColor, lightenColor } = colorTransfer;

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
let maxId = 5;

const colorModule = {
  genRandomColors: (allColors) => {
    return allColors.map((x) => ({
      ...x,
      color: x.locked ? x.color : genRandomcolor(),
    }));
  },
  toggleLock: (arr, id) => {
    return arr.map((x) => {
      return {
        ...x,
        locked: x.id === id ? !x.locked : x.locked,
      };
    });
  },
  showShade: (arr, id) => {
    return arr.map((x) => {
      return {
        ...x,
        shaded: x.id === id ? true : x.shaded,
      };
    });
  },
  hideShade: (arr) => {
    return arr.map((x) => {
      return {
        ...x,
        shaded: false,
      };
    });
  },
  replaceColor: (arr, id, hex) => {
    return arr.map((x) => {
      return {
        ...x,
        color: x.id === id ? hex : x.color,
      };
    });
  },
  removeColor: (arr, id) => {
    return arr.filter((x) => x.id !== id);
  },
  addColor: (arr, id) => {
    const newColor = {
      id: maxId++,
      color: "#ffffff",
      locked: false,
      shaded: false,
    };
    let target = [...arr];
    console.log(id);
    if (id === "head") {
      target.unshift({
        ...newColor,
        color: lightenColor(arr[0].color),
      });
      return target;
    }
    if (id === "end") {
      target.push({
        ...newColor,
        color: darkenColor(arr[arr.length - 1].color),
      });
      return target;
    }

    const idx = arr.findIndex((x) => x.id === id);
    target.splice(idx, 0, {
      ...newColor,
      color: findAverage(arr[idx - 1].color, arr[idx].color),
    });

    return target;
  },
};
export default colorModule;
