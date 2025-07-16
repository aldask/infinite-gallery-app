import styles from "./PhotoCard.module.css";
import type { PhotoCardProps } from "../../types/Types";

function PhotoCard({ photo, isFavorite, onFavToggle }: PhotoCardProps) {
  const handleFavToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavToggle(photo);
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={photo.src.portrait}
        alt={photo.alt}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <p className={styles.title}>{photo.alt}</p>
        <p className={styles.photographer}>{photo.photographer}</p>
        <button className={styles.button} onClick={handleFavToggle}>
          {isFavorite ? "Unfavourite" : "Favourite"}
        </button>
      </div>
    </div>
  );
}
export default PhotoCard;
