import { useEffect, useState } from "react";
import type { PexelPhoto } from "../../types/Types";
import { displayFavPics, removeFavPic } from "../../types/useLocalStorage";
import styles from "./FavsList.module.css";
import type { FavsListProps } from "../../types/Types";
import PhotoCard from "../PhotoCard/PhotoCard";

function FavsList({ isOpen, onClose }: FavsListProps) {
  const [favs, setFavs] = useState<PexelPhoto[]>([]);

  useEffect(() => {
    if (isOpen) {
      const favPics = displayFavPics();
      setFavs(favPics);
    }
  }, [isOpen]);

  const handleRemove = (photo: PexelPhoto) => {
    removeFavPic(photo.id);
    setFavs((prevFavs) => prevFavs.filter((fav) => fav.id !== photo.id));
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
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={true}
                onFavToggle={handleRemove}
                setting="favs"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavsList;
