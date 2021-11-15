import React, { useContext } from "react";
import style from "./ColorBlock.module.scss";
import MdiIcon from "./../mdi-icon/MdiIcon";
import context from "../../context/allColor";
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
  const { id, colorHex, locked } = props.colorInfo;

  // 背景色
  const styleBg = {
    backgroundColor: colorHex,
  };
  const { setToggleLock } = useContext(context);
  const handleClickLock = () => {
    setToggleLock(id);
  };
  return (
    <div className={style.block} style={styleBg}>
      <div className={style.block__tools}>
        <MdiIcon mobileHide={true} icon={mdiClose} />
        <MdiIcon mobileHide={true} icon={mdiGrid} />
        <MdiIcon mobileHide={true} icon={mdiStarOutline} />
        <MdiIcon mobileHide={false} icon={mdiArrowLeftRight} />
        <MdiIcon mobileHide={false} icon={mdiContentCopy} />
        <MdiIcon
          mobileHide={false}
          isLarge={locked}
          icon={locked ? mdiLock : mdiLockOpen}
          onClickCallBack={handleClickLock}
        />
      </div>
      <div className={style.block__label}>{colorHex}</div>
    </div>
  );
};

export default ColorBlock;
