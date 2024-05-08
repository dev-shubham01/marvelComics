import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import styles from "./Pagination.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.[paginationRange?.length - 1] ?? 1;
  return (
    <div className={styles.paginationContainer}>
      <li
        className={classnames(styles.paginationItem, {
          [styles.disabled]: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <ArrowBackIosIcon style={{fontSize:"17px"}}/>
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className={classnames(styles.paginationItem, styles.dots)}>&#8230;</li>;
        }

        return (
          <li
            key={index}
            className={classnames(styles.paginationItem, {
              [styles.selected]: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames(styles.paginationItem, {
          [styles.disabled]: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <ArrowForwardIosIcon style={{fontSize:"17px"}}/>
      </li>
    </div>
  );
};

export default Pagination;
