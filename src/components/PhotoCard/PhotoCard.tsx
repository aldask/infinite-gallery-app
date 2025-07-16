import styles from "./PhotoCard.module.css";
import type { PhotoCardProps } from "../../types/Types";

function PhotoCard({
  photo,
  isFavorite,
  onFavToggle,
  setting,
}: PhotoCardProps) {
  const handleFavToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavToggle(photo);
  };

  const cardClassName =
    setting === "favs" ? `${styles.card} ${styles.cardFavs}` : styles.card;

  return (
    <div className={cardClassName}>
      <img
        className={styles.image}
        src={photo.src.portrait}
        alt={photo.alt}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <div className={styles.inside}>
          <div className={styles.textWrapper}>
            <p className={styles.title}>{photo.alt}</p>
            <p className={styles.photographer}>{photo.photographer}</p>
          </div>
        </div>
        <button className={styles.button} onClick={handleFavToggle}>
          {isFavorite ? "Unfavourite" : "Favourite"}
        </button>
      </div>
    </div>
  );
}
export default PhotoCard;
