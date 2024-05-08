import React, { useState, useEffect, useMemo } from "react";
import styles from "./MainScreen.module.css";
import { fetchComics } from "../../lib/utils";
import MovieCard from "../MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Pagination from "../Pagination/Pagination";

export default function MainScreen({
  filteredComics,
  setClearFilter,
  clearFilter,
  selectedCharacter,
  setFilteredComics
}) {
  const [comics, setComics] = useState(filteredComics || []);

  const [recordPerPage, setRecordsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  // fetch comics to display in home page as suggestions
  const {
    isLoading,
    data: comic,
    refetch,
  } = useQuery({ queryKey: ["comics"], queryFn: fetchComics });
  
// when user select character from carousel then display data based on that 
// when user click clear all button then reseting the comics to display at home page
  useEffect(() => {
    if (clearFilter) {
      refetch();
      setComics(comic?.data?.results);
    }
    filteredComics.length > 0
      ? setComics(filteredComics)
      : setComics(comic?.data?.results);
  }, [isLoading, filteredComics, clearFilter,comic?.data?.results,refetch]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredComics]);
  useEffect(() => {
    if (clearFilter) {
      refetch();
    }
    filteredComics.length > 0
      ? setComics(filteredComics)
      : setComics(comic?.data?.results);
  }, [isLoading, filteredComics, clearFilter,comic?.data?.results,refetch]);
   // using useMemo for memoization and making react applicaiton faster
    const currentPageComics = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * recordPerPage;
    const lastPageIndex = firstPageIndex + recordPerPage;
    return comics?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, comics, recordPerPage]);

  return (
    <div className={styles.mainScreen}>
      <div className={styles.topbar}>
        {!filteredComics.length > 0 ? (
          <div className={styles.suggestions}>Suggestions</div>
        ) : (
          <div className={styles.explore}>
            Explore:
            {selectedCharacter.length > 0 &&
              selectedCharacter.slice(0, 5).map((character, index) => (
                <div key={index} className={styles.characterNames}>
                  {character}
                </div>
              ))}
            {selectedCharacter.length > 5 && (
              <div className={styles.characterNames}>...</div>
            )}
          </div>
        )}
        <div className={styles.selectListItems}>
          {!filteredComics.length > 0 ? null : (
            <button
              className={styles.filterButton}
              onClick={() => {
                setClearFilter(true);
              }}
            >
              Clear All Filters
            </button>
          )}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Select Quantity</button>
            <div className={styles.dropdownContent}>
              <span
                onClick={() => {
                  setRecordsPerPage(5);
                  setCurrentPage(1);
                }}
              >
                5
              </span>
              <span
                onClick={() => {
                  setRecordsPerPage(10);
                  setCurrentPage(1);
                }}
              >
                10
              </span>
              <span
                onClick={() => {
                  setRecordsPerPage(15);
                  setCurrentPage(1);
                }}
              >
                15
              </span>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.centeredProgress}>
          <CircularProgress style={{ color: "red" }} />
        </div>
      ) : (
        <>
          <div className={styles.movies}>
            {currentPageComics?.length > 0 && (
              <>
                {currentPageComics.map((comic) => (
                  <MovieCard
                    key={comic["id"]}
                    imgUrl={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                    details={comic}
                  />
                ))}
              </>
            )}
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalCount={comics?.length}
              pageSize={recordPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
}
