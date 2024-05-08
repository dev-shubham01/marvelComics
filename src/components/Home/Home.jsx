import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Carousel from "../Carousel/Carousel";
import MainScreen from "../MainScreen/MainScreen";
import { fetchComicsByCharacterId, fetchComicsByName } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import SearchScreen from "../SearchScreen/SearchScreen";
import styles from "./Home.module.css";

export default function Home() {
  const [selectedComicId, setSelectedComicId] = useState("");
  const [filteredComics, setFilteredComics] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  const [allSearchedComics, setAllSearchedComics] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState([]);
  useEffect(() => {
    if (clearFilter) {
      setAllSearchedComics([]);
      setFilteredComics([]);
      setSelectedComicId(null);
      setClearFilter(false);
      setSelectedCharacter([]);
    }
  }, [clearFilter]);

  useQuery({
    queryKey: ["comics", selectedComicId],
    queryFn: async () => {
      const { data } = await fetchComicsByCharacterId(selectedComicId);
      let temp = allSearchedComics;
      temp[selectedComicId] = data.results;
      setAllSearchedComics(temp);
      setFilteredComics((prevFilteredComics) => [
        ...data.results,
        ...prevFilteredComics,
      ]);
      return data.results;
    },
    enabled: !!selectedComicId,
  });

  const handleSelectedComicId = (id, character) => {
    console.log(id);
    setSelectedComicId(id);
    setSelectedCharacter((prev) => [...prev, character?.name]);
  };

  const handleDeselectedComicId = (id, character) => {
    let allSearchedComicsKeys = Object.keys(allSearchedComics);
    // setSelectedComicId(id)
    let allLeftSearchedComicsAfterDeselect = allSearchedComicsKeys.filter(
      (comics) => comics != id,
    );
    let allComicsSelected = [];

    allLeftSearchedComicsAfterDeselect.map((comics) =>
      allComicsSelected.push(...allSearchedComics[comics]),
    );
    let tempArray = allSearchedComics;
    delete tempArray[id];
    setAllSearchedComics(tempArray);
    setFilteredComics(allComicsSelected);
    const leftCharacters = selectedCharacter.filter(
      (characterName) => characterName != character?.name,
    );
    setSelectedCharacter(leftCharacters);
    setSelectedComicId(null);
  };

  const handleSearchBar = (searchValue) => {
    setSearchText(searchValue);
  };

  const handleSearch = (searchValue) => {
    if (searchValue == "Enter") setSearchValue(searchText);
  };
  return (
    <div className={styles.homePage}>
      <Navbar
        handleSearchText={handleSearchBar}
        searchText={searchText}
        handleSearch={handleSearch}
      />
      <Carousel
        handleSelectedComicId={handleSelectedComicId}
        handleDeselectedComicId={handleDeselectedComicId}
        clearFilter={clearFilter}
      />
      {searchValue && searchValue.length > 0 ? (
        <div className={styles.searchScreen}>
          <SearchScreen
            searchValue={searchValue}
            closeSearch={() => {
              setSearchValue("");
              setSearchText("");
            }}
          />
        </div>
      ) : (
        <div>
          <MainScreen
            clearFilter={clearFilter}
            filteredComics={filteredComics}
            setClearFilter={setClearFilter}
            selectedCharacter={selectedCharacter}
          />
        </div>
      )}
    </div>
  );
}
