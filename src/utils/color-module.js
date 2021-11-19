import colorTransfer from "./color-transfer";
// 轉換顏色函式庫
const { findAverage, darkenColor, lightenColor } = colorTransfer;
// hex 字元
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

/**
 * 產生亂數hex字元
 *
 * @returns {string} - 任意hex字元
 */
const randHex = () => HEXS[Math.floor(Math.random() * HEXS.length)];

/**
 * 產生亂數色號
 *
 * @returns {string} - 任意hex色號
 */
const genRandomcolor = () =>
  `#${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}`;

// 紀錄最大id值
let maxId = 5;

// 顏色模組函式庫
const colorModule = {
  /**
   * 產生隨機色票陣列
   *
   * @param {array} allColors - 原始色票陣列
   * @returns {array} - 隨機色票陣列
   */
  genRandomColors: (allColors) => {
    return allColors.map((x) => ({
      ...x,
      color: x.locked ? x.color : genRandomcolor(),
    }));
  },

  /**
   * 鎖定/解鎖色票
   *
   * @param {array} arr - 原始色票陣列
   * @param {number} id - id
   * @returns {array} - 色票陣列
   */
  toggleLock: (arr, id) => {
    return arr.map((x) => {
      return {
        ...x,
        locked: x.id === id ? !x.locked : x.locked,
      };
    });
  },

  /**
   * 開啟色階
   *
   * @param {array} arr - 原始色票陣列
   * @param {number} id - id
   * @returns {array} - 色票陣列
   */
  showShade: (arr, id) => {
    return arr.map((x) => {
      return {
        ...x,
        shaded: x.id === id ? true : x.shaded,
      };
    });
  },

  /**
   * 關閉色階
   * @param {array} arr - 原始色票陣列
   * @returns {array} - 色票陣列
   */
  hideShade: (arr) => {
    return arr.map((x) => {
      return {
        ...x,
        shaded: false,
      };
    });
  },
  /**
   * 置換顏色
   *
   * @param {array} arr - 原始色票陣列
   * @param {number} id - 色票id
   * @param {string} hex - 新色號
   * @returns {array} - 色票陣列
   */
  replaceColor: (arr, id, hex) => {
    return arr.map((x) => {
      return {
        ...x,
        color: x.id === id ? hex : x.color,
      };
    });
  },

  /**
   * 移除色票
   *
   * @param {array} arr - 原始色票陣列
   * @param {number} id - id
   * @returns {array} - 色票陣列
   */
  removeColor: (arr, id) => {
    if(arr.length === 1) return arr;
    return arr.filter((x) => x.id !== id);
  },

  /**
   * 新增色票
   *
   * @param {array} arr - 原始色票陣列
   * @param {number} id - id
   * @returns {array} - 色票陣列
   */
  addColor: (arr, id) => {
    const newColor = {
      id: maxId++,
      color: "#ffffff",
      locked: false,
      shaded: false,
    };
    let target = [...arr];

    // 插入在第一位
    if (id === "head") {
      target.unshift({
        ...newColor,
        color: lightenColor(arr[0].color),
      });
      return target;
    }

    // 插入在最後一位
    if (id === "end") {
      target.push({
        ...newColor,
        color: darkenColor(arr[arr.length - 1].color),
      });
      return target;
    }

    // 插入在色票和色票中間
    const idx = arr.findIndex((x) => x.id === id);
    target.splice(idx, 0, {
      ...newColor,
      // 計算中間色
      color: findAverage(arr[idx - 1].color, arr[idx].color),
    });

    return target;
  },
};
export default colorModule;
