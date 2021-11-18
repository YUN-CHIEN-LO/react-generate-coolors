import React, { useContext } from "react";
import style from "./ColorAdd.module.scss";
import contextAllcolor from "../../context/allColor";
export default function ColorAdd(props) {
  const { addColor } = useContext(contextAllcolor);
  const handleClick = () => {
    addColor(props.id);
  };
  const isHead = props.id === "head" ? style.add__head : null;
  const isEnd = props.id === "end" ? style.add__end : null;
  return (
    <div
      className={`${style.add} ${isHead} ${isEnd}`}
      onClick={handleClick}
    >
    </div>
  );
}
