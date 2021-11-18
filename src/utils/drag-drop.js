const dragDrop = {
  /**
   * 排序陣列
   *
   * @param {Array} list - 要排序的陣列
   * @param {number} startIndex - 起始位置
   * @param {number} endIndex - 結束位置
   * @returns {Array} 排序完成的陣列
   */
  reorder: (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  },
};
export default dragDrop;
