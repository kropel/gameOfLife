import React from "react";
import Style from "./Squer.module.css";

const Squer = ({ alive = false, clickListener, ...conf }) => {
  let styleClasses = [Style.Squer];
  if (alive) styleClasses.push(Style.Alive);
  styleClasses = styleClasses.join(" ");

  return <div className={styleClasses} {...conf}></div>;
};

export default Squer;
