import React, { useContext, useState } from "react";
import style from "./ColorBlock.module.scss";
import MdiIcon from "./../mdi-icon/MdiIcon";
import contextAllcolor from "../../context/allColor";
import contextAlert from "../../context/alert";
import { colorTransfer } from "../../utils";
import {
  mdiClose,
  mdiGrid,
  mdiStarOutline,
  mdiArrowLeftRight,
  mdiContentCopy,
  mdiLockOpen,
  mdiLock,
} from "@mdi/js";

// 顏色轉換函式
const { Hex2Hsl, Hsl2Hex, textColor } = colorTransfer;

/**
 * 色票
 *
 * @param {object} props - 屬性
 * @returns {JSX} 色票樣板
 */
const ColorBlock = (props) => {
  // 色票資訊(屬性)
  const { id, color, locked, shaded } = props.colorInfo;
  // 通知模組函示
  const { showAlert } = useContext(contextAlert);
  // 顏色模組函式
  const { setToggleLock, setShowShade, setHideShade, setColor, removeColor } =
    useContext(contextAllcolor);
  // 是否顯示色階
  const [shades, setShades] = useState([]);

  // 色票樣式
  const blockStyle = {
    backgroundColor: color,
    color: textColor(color),
  };

  // 顯示色階的 className
  const shadeClass = shaded
    ? `${style.block__shade}`
    : `${style.block__shade} ${style.hide}`;

  // 不顯示色階的 className
  const noShadeClass = shaded
    ? `${style.block__noshade} ${style.hide}`
    : `${style.block__noshade}`;

  /**
   * 處理點擊移除事件
   */
  const handleClickRemove = () => {
    removeColor(id);
  };

  /**
   * 處理點擊色階事件
   */
  const handleClickShade = () => {
    setShowShade(id);
    setShades((arr) => genShades(color));
  };

  /**
   * 處理點擊複製事件
   */
  const handleClickCopy = () => {
    navigator.clipboard.writeText(color);
    showAlert("Color copied to clip board !");
  };

  /**
   * 處理點擊鎖定事件
   */
  const handleClickLock = () => {
    setToggleLock(id);
  };

  /**
   * 產生色階
   *
   * @param {string} hex - 目標色票
   * @returns {Array} JSX 色階陣列
   */
  const genShades = (hex) => {
    let arr = [];

    // 總共產生25個色階
    for (let i = 0; i < 104; i += 4) {
      // 目標色票的Hsl值
      const { H, S, L } = Hex2Hsl(hex);
      // 若靠近目標色票，則視為目標色票
      const isOriginColor = L < i && L > i - 4;
      // 產生的色階的色號
      const tmpHex = Hsl2Hex({
        H: H,
        S: S,
        L: isOriginColor ? L : i,
      });

      arr.unshift(
        // 色階單位樣板
        <div
          key={tmpHex}
          className={style.shades}
          style={{
            backgroundColor: tmpHex,
            color: textColor(tmpHex),
          }}
          onClick={(evt) => {
            evt.stopPropagation();
            // 更新色票顏色為此色階顏色
            setColor(id, tmpHex);
            // 關閉所有色階
            setHideShade();
          }}
        >
          {/* 若此色階為目標色票，永遠顯示色號 */}
          <span style={isOriginColor ? { opacity: 1 } : {}}>{tmpHex}</span>
        </div>
      );
    }

    return arr;
  };

  return (
    <div
      className={style.block}
      onClick={(evt) => {
        evt.stopPropagation();
        // 點擊色票，關閉色階
        setHideShade();
      }}
    >
      {/* 隱藏色階 */}
      <div className={noShadeClass} style={blockStyle}>
        {/* 工具列 */}
        <div className={style.block__tools}>
          {/* 移除 */}
          <MdiIcon
            mobileHide={true}
            icon={mdiClose}
            onClickCallBack={handleClickRemove}
          />
          {/* 色階 */}
          <MdiIcon
            mobileHide={true}
            icon={mdiGrid}
            onClickCallBack={handleClickShade}
          />
          {/* 星號 */}
          <MdiIcon mobileHide={true} icon={mdiStarOutline} />
          {/* 拖拉 */}
          <MdiIcon mobileHide={false} icon={mdiArrowLeftRight} />
          {/* 複製 */}
          <MdiIcon
            mobileHide={false}
            icon={mdiContentCopy}
            onClickCallBack={handleClickCopy}
          />
          {/* 鎖定 */}
          <MdiIcon
            mobileHide={false}
            isLarge={locked}
            icon={locked ? mdiLock : mdiLockOpen}
            onClickCallBack={handleClickLock}
          />
        </div>
        {/* 色號 */}
        <div className={style.block__label}>{color.toUpperCase()}</div>
      </div>

      {/* 色階 */}
      <div className={shadeClass}>{shades.map((x) => x)}</div>
    </div>
  );
};

export default ColorBlock;
