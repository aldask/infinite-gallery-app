import styles from "./PhotoCard.module.css";
import type { PhotoCardProps } from "../../types/Types";

function PhotoCard({ photo, isFav, onFavToggle }: PhotoCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={photo.src.portrait}
        alt={photo.alt}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <p className={styles.title}>{photo.photographer}</p>
        <button onClick={() => onFavToggle(photo.id)}>
          {isFav ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
