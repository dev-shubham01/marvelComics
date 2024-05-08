import React from 'react'
import styles from "./MovieCards.module.css";

export default function MovieCard({ imgUrl , details}) {
  return (
    <div className={styles.movieCard}>
      <img className={styles.moviesImage} src={imgUrl} />
      <div className={styles.imgTitle}>
      <span className={styles.titleHeading}>{details?.title}</span> <span style={{color:"#f3750e"}}>{`#${details?.issueNumber}`}</span>
      </div>
    </div>
  )
}
