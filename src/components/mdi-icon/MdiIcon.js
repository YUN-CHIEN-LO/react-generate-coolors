import React from "react";
import Icon from "@mdi/react";
import style from "./MdiIcon.module.scss";
export default function MdiIcon(props) {
  const { isLarge, icon, mobileHide, onClickCallBack } = props;
  const classes = mobileHide
    ? `${style.icon} ${style.mobileHide}`
    : `${style.icon}`;

  const size = isLarge ? 1.5 : 1;
  const lockedStyle = isLarge
    ? {
        opacity: 1,
      }
    : {};
  const handleClick = () => {
    if (typeof onClickCallBack === "function") {
      onClickCallBack();
    }
  };
  return (
    <Icon
      style={lockedStyle}
      className={classes}
      path={icon}
      size={size}
      onClick={(evt) => {
        evt.stopPropagation();
        handleClick();
      }}
    />
  );
}
