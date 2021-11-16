import React, { useState, useEffect, useRef } from "react";
import ColorBlock from "../color-block/ColorBlock";
import style from "./ColorBoard.module.scss";
import { Provider } from "../../context/allColor";
import {
  DEFAULT_COLOR,
  genRandomColors,
  toggleLock,
  showShade,
  hideShade,
  replaceColor,
} from "./utils";

const ColorBoard = () => {
  const [allColor, setAllColor] = useState(DEFAULT_COLOR);

  const context = {
    colors: allColor,
    setToggleLock: (id) => {
      setAllColor((colors) => toggleLock(colors, id));
    },
    setShowShade: (id) => {
      setAllColor((colors) => showShade(colors, id));
    },
    setHideShade: () => {
      setAllColor((colors) => hideShade(colors));
    },
    setColor: (id, hex) => {
      setAllColor((colors) => replaceColor(colors, id, hex));
    },
  };

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
        setAllColor((colors) => genRandomColors(colors));
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
    <Provider value={context}>
      <div className={style.board}>
        {context.colors.map((x) => (
          <ColorBlock key={x.id} colorInfo={x} />
        ))}
      </div>
    </Provider>
  );
};

export default ColorBoard;
