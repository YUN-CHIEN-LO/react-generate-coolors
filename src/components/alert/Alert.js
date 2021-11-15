import React from "react";
import { createPortal } from "react-dom";
import style from "./Alert.module.scss";
export default function Alert(props) {
    const { message } = props;
  return createPortal(
    <div className={style.alert}>{message}</div>,
    document.getElementById("modal")
  );
}
