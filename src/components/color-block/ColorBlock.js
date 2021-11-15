import React from "react";
import style from "./ColorBlock.module.scss";

const ColorBlock = (props) => {
  // Hex 色票
  const { colorHex } = props.colorInfo;
  // 背景色
  const styleBg = {
    backgroundColor: colorHex,
  };
  return (
    <div className={style.block} style={styleBg}>
      <div className={style.block__tools}></div>
      <div className={style.block__label}>{colorHex}</div>
    </div>
  );
};

export default ColorBlock;
