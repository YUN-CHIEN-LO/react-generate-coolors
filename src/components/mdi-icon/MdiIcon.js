import React from "react";
import Icon from "@mdi/react";
import style from "./MdiIcon.module.scss";
export default function MdiIcon(props) {
  const classes = props.mobileHide
    ? `${style.icon} ${style.mobileHide}`
    : `${style.icon}`;
  return <Icon className={classes} path={props.icon} size={1} />;
}
