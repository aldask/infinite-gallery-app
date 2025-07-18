import styles from "./PhotoCard.module.css";
import type { PhotoCardProps } from "../../types/Types";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";

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
      <ProgressiveImage
        lowResSrc={photo.src.small}
        highResSrc={photo.src.medium}
        alt={photo.alt}
      />
      <div className={styles.overlay}>
        <div className={styles.inside}>
          <div className={styles.textWrapper}>
            <p className={styles.title}>{photo.alt}</p>
            <p className={styles.photographer}>{photo.photographer}</p>
          </div>
          <button className={styles.button} onClick={handleFavToggle}>
            {isFavorite ? "Unfavourite" : "Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
