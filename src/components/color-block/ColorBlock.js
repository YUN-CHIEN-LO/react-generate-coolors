import React, { useContext } from "react";
import style from "./ColorBlock.module.scss";
import MdiIcon from "./../mdi-icon/MdiIcon";
import contextAllcolor from "../../context/allColor";
import contextAlert from "../../context/alert";
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
  const { setToggleLock } = useContext(contextAllcolor);
  const handleClickLock = () => {
    setToggleLock(id);
  };

  const { showAlert, setMessage } = useContext(contextAlert);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(colorHex);
    setMessage((x) => "Color copied to clip board !");
    showAlert();
  };
  return (
    <div className={style.block} style={styleBg}>
      <div className={style.block__tools}>
        <MdiIcon mobileHide={true} icon={mdiClose} />
        <MdiIcon mobileHide={true} icon={mdiGrid} />
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
      <div className={style.block__label}>{colorHex}</div>
    </div>
  );
};

export default ColorBlock;
