import React, { useState, useEffect, useRef } from "react";
import ColorBlock from "../color-block/ColorBlock";
import style from "./ColorBoard.module.scss";
import { Provider } from "../../context/allColor";
import { genRandomColors } from "./utils";
const ColorBoard = () => {
  const [allColor, setAllColor] = useState([
    {
      id: 0,
      colorHex: "#D4AFB9",
    },
    {
      id: 1,
      colorHex: "#d1cfe2",
    },
    {
      id: 2,
      colorHex: "#9cadce",
    },
    {
      id: 3,
      colorHex: "#7ec4cf",
    },
    {
      id: 4,
      colorHex: "#52b2cf",
    },
  ]);

  const refSpaceListener = useRef({});

  // 監聽空白鍵事件
  useEffect(() => {
    // 回乎函式
    const onPress = (event) => {
      event.preventDefault();
      // 簡單debounce
      clearTimeout(refSpaceListener.current);
      refSpaceListener.current = setTimeout(() => {
        // 產生新的色票
        setAllColor((arr) => genRandomColors(arr));
      }, 300);
    };

    // 掛載監聽事件
    document.addEventListener("keydown", (event) => onPress(event));

    // 取消函式
    return () => {
      // 移除監聽事件
      window.addEventListener("scroll", (event) => onPress(event));
    };
  }, []);

  return (
    <Provider value={allColor}>
      <div className={style.board}>
        {allColor.map((x) => (
          <ColorBlock key={x.id} colorInfo={x} />
        ))}
      </div>
    </Provider>
  );
};

export default ColorBoard;
