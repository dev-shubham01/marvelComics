import React, {  useState, useEffect } from "react";
import CarouselCards from "../CarouselCard/CarouselCards";

import styles from "./Carousel.module.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { fetchCharacters } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export default function Home ({
  handleSelectedComicId,
  handleDeselectedComicId,
  clearFilter,
}) {
  const [characters, setCharacters] = useState([]);
  const [selectedCharactersIds, setSelectedCharactersIds] = useState([]);
  const { isLoading, data: character } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });
  useEffect(() => {
    setCharacters(character?.data?.results);
  }, [character]);

  useEffect(() => {
    if (clearFilter) {
      setSelectedCharactersIds([]);
    }
  }, [clearFilter]);
  let box = document.querySelector("#carouselcontainer");

  const btnpressprev = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    console.log(width);
  };

  const btnpressnext = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    console.log(width);
  };

  const setSelectedIdsFunction = (id, character) => {
    let tempSelectedCharacters = selectedCharactersIds;
    const index = tempSelectedCharacters.indexOf(id);
    if (index > -1) {
      tempSelectedCharacters.splice(index, 1);
      handleDeselectedComicId(id, character);
    } else {
      tempSelectedCharacters.push(id);
      handleSelectedComicId(id, character);
    }
  };
  return (
    <div className={styles.carouselContainer}>
      {isLoading ? (
        <CircularProgress style={{ color: "red" }} />
      ) : (
        <>
          {" "}
          <ArrowCircleLeftIcon
            className={styles.arrow}
            onClick={btnpressprev}
          />
          <div className={styles.carousel} id="carouselcontainer">
            {characters?.length > 0 &&
              characters.map((character) => (
                <CarouselCards
                  key={character.id}
                  isSelected={selectedCharactersIds}
                  setSelected={(id, character) => {
                    setSelectedIdsFunction(id, character);
                  }}
                  id={character.id}
                  imgUrl={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
                  clearFilter={clearFilter}
                  character={character}
                />
              ))}
          </div>
          <ArrowCircleRightIcon
            className={styles.arrow}
            onClick={btnpressnext}
          />
        </>
      )}
    </div>
  );
}
