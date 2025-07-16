import { useEffect, useState } from "react";
import type { PexelPhoto } from "../../types/Types";
import { displayFavPics, removeFavPic } from "../../types/useLocalStorage";
import styles from "./FavsList.module.css";
import type { FavsListProps } from "../../types/Types";

function FavsList({ isOpen, onClose }: FavsListProps) {
  const [favs, setFavs] = useState<PexelPhoto[]>([]);

  useEffect(() => {
    if (isOpen) {
      const favPics = displayFavPics();
      setFavs(favPics);
    }
  }, [isOpen]);

  const handleRemove = (id: number) => {
    removeFavPic(id);
    setFavs((prevFavs) => prevFavs.filter((fav) => fav.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Your Favorite Photos</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.grid}>
          {favs.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            favs.map((photo) => (
              <div key={photo.id} className={styles.card}>
                <img src={photo.src.portrait} alt={photo.alt} loading="lazy" />
                <p>{photo.photographer}</p>
                <button onClick={() => handleRemove(photo.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavsList;
