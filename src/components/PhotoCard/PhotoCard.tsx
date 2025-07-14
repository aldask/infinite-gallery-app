import type { PhotoCardProps } from "../../types/Types";
import styles from "./PhotoCard.module.css";

function PhotoCard({ photo, isFav, onFavToggle }: PhotoCardProps) {
  return (
    <div className={styles.photoCard}>
      <img src={photo.src.medium} alt={photo.alt} />
      <div className={styles.infoOverlay}>
        <p>{photo.photographer}</p>
        <button onClick={() => onFavToggle(photo.id)}>
          {isFav ? "unfav" : "fav"}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
