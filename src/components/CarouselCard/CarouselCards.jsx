import React, { useState, useEffect } from "react";
import styles from "./CarouselCard.module.css";
import DoneIcon from "@mui/icons-material/Done";

export default function CarouselCards({
  character,
  id,
  imgUrl,
  setSelected,
  clearFilter,
}) {
  const [select, setSelect] = useState(false);
 // when user click clear all filter then deselect all the characters
  useEffect(() => {
    setSelect(false);
  }, [clearFilter]);
  return (
    <div className={select ? styles.selected : styles.notSelected}>
      <img
        className={select ? styles.carouselCardsSelected : styles.carouselCards}
        src={imgUrl}
        alt={id}
        onClick={() => {
          setSelect(!select);
          setSelected(id, character);
        }}
      />
      <DoneIcon
        className={select ? styles.tick : styles.untick}
        onClick={() => {
          setSelect(!select);
          setSelected(id, character);
        }}
      />
    </div>
  );
}
