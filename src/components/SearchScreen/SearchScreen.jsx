import React, { useEffect, useState, useMemo } from "react";
import styles from "./SearchScreen.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchComicsByName } from "../../lib/utils";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Pagination from "../Pagination/Pagination";

export default function SearchScreen({ searchValue, closeSearch }) {
  const [searchComics, setSearchComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const resultPerPage = 4;
  const { isLoading: isSearchResultLoading, data: searchResultComics } =
    useQuery({
      queryKey: ["searchResult", searchValue],
      queryFn: async () => {
        const { data } = await fetchComicsByName(searchValue);
        return data.results;
      },
      enabled: !!searchValue,
    });
  useEffect(() => {
    if (!isSearchResultLoading) setSearchComics(searchResultComics);
  }, [searchValue, isSearchResultLoading]);

  const currentPageComics = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * resultPerPage;
    const lastPageIndex = firstPageIndex + resultPerPage;
    return searchComics?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchComics]);

  return (
    <div className={styles.search}>
      <div className={styles.searchTop}></div>
      <div className={styles.heading}>
        <h2 className={styles.searchHeading}>
          Search Results for{" "}
          <span className={styles.searchValue}>{searchValue}</span>{" "}
        </h2>
        <CloseIcon
          className={styles.CloseIcon}
          onClick={closeSearch}
        />
      </div>
      <div className={styles.searchScreen}>
        {isSearchResultLoading ? (
          <CircularProgress className={styles.loader} />
        ) : (
          <>
            {" "}
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
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={searchComics?.length}
        pageSize={resultPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
