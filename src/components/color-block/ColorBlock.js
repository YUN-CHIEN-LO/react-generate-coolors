import React, { useContext, useState } from "react";
import style from "./ColorBlock.module.scss";
import MdiIcon from "./../mdi-icon/MdiIcon";
import contextAllcolor from "../../context/allColor";
import contextAlert from "../../context/alert";
import { Hex2Hsl, Hsl2Hex } from "./utils";
import {
  mdiClose,
  mdiGrid,
  mdiStarOutline,
  mdiArrowLeftRight,
  mdiContentCopy,
  mdiLockOpen,
  mdiLock,
} from "@mdi/js";

const ColorBlock = (props) => {
  // Hex 色票
  const { id, color, locked, shaded } = props.colorInfo;

  // 背景色
  const styleBg = {
    backgroundColor: color,
  };
  const { setToggleLock, setShowShade, setHideShade, setColor } =
    useContext(contextAllcolor);
  const handleClickLock = () => {
    setToggleLock(id);
  };

  const { showAlert } = useContext(contextAlert);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(color);
    showAlert("Color copied to clip board !");
  };

  const [shades, setShades] = useState([]);

  const genShades = (hex) => {
    let arr = [];
    const originHSL = Hex2Hsl(hex);
    for (let i = 0; i < 104; i += 4) {
      const { H, S, L } = originHSL;
      const isOriginColor = L < i && L > i - 4;
      const tmpHex = Hsl2Hex({
        H: H,
        S: S,
        L: isOriginColor ? L : i,
      });
      const bgStyle = {
        backgroundColor: tmpHex,
      };
      const originStyle = isOriginColor
        ? {
            opacity: 1,
          }
        : {};
      arr.unshift(
        <div
          key={tmpHex}
          className={style.shades}
          style={bgStyle}
          onClick={(evt) => {
            evt.stopPropagation();
            setColor(id, tmpHex);
            setHideShade();
          }}
        >
          <span style={originStyle}>{tmpHex}</span>
        </div>
      );
    }

    return arr;
  };

  const handleClickShade = () => {
    setShowShade(id);
    setShades((arr) => genShades(color));
  };

  const noShadeClass = shaded
    ? `${style.block__noshade} ${style.hide}`
    : `${style.block__noshade}`;
  const shadeClass = shaded
    ? `${style.block__shade}`
    : `${style.block__shade} ${style.hide}`;
  return (
    <div
      className={style.block}
      onClick={(evt) => {
        evt.stopPropagation();
        setHideShade();
      }}
    >
      <div className={noShadeClass} style={styleBg}>
        <div className={style.block__tools}>
          <MdiIcon mobileHide={true} icon={mdiClose} />
          <MdiIcon
            mobileHide={true}
            icon={mdiGrid}
            onClickCallBack={handleClickShade}
          />
          <MdiIcon mobileHide={true} icon={mdiStarOutline} />
          <MdiIcon mobileHide={false} icon={mdiArrowLeftRight} />
          <MdiIcon
            mobileHide={false}
            icon={mdiContentCopy}
            onClickCallBack={handleClickCopy}
          />
          <MdiIcon
            mobileHide={false}
            isLarge={locked}
            icon={locked ? mdiLock : mdiLockOpen}
            onClickCallBack={handleClickLock}
          />
        </div>
        <div className={style.block__label}>{color}</div>
      </div>

      <div className={shadeClass}>{shades.map((x) => x)}</div>
    </div>
  );
};

export default ColorBlock;
