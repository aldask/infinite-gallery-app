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

  return (
    <div
      className={
        setting === "favs" ? `${styles.card} ${styles.cardFavs}` : styles.card
      }
    >
      <ProgressiveImage
        lowResSrc={photo.src.small}
        highResSrc={photo.src.large2x}
        alt={photo.alt}
      />
      <div className={styles.overlay}>
        <div className={styles.inside}>
          <div className={styles.textWrapper}>
            {setting !== "favs" && (
              <>
                <p className={styles.title}>{photo.alt}</p>
                <p className={styles.photographer}>{photo.photographer}</p>
              </>
            )}
          </div>
          <button
            className={
              setting === "favs" ? `${styles.favButton}` : styles.button
            }
            onClick={handleFavToggle}
          >
            {isFavorite ? "Unfavourite" : "Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
