import React from "react";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar({ handleSearch, handleSearchText, searchText }) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.heading}>Marvel</div>

        <div className={styles.searchbar}>
          <SearchIcon className={styles.searchIcon} />
          <input
            placeholder="Search for comics..."
            className={styles.searchInput}
            value={searchText}
            onChange={(event) => handleSearchText(event.target.value)}
            onKeyDown={(event) => handleSearch(event.key)}
          />
        </div>
      </div>
    </header>
  );
}
