import { useEffect, useState } from "react";
import type { PexelPhoto } from "../../types/Types";
import fetchPexelPic from "../../api/Pexels";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "./PhotoList.module.css";
import useFavorites from "../../hooks/useFavorites";

function PhotoList() {
  const [photos, setPhotos] = useState<PexelPhoto[]>([]);
  const [page] = useState(1);
  const [loading, setLoading] = useState(false);
  const { isFav, handleFavButton } = useFavorites();

  useEffect(() => {
    const loadPics = async () => {
      setLoading(true);
      try {
        const newPics = await fetchPexelPic(page);
        setPhotos((prev) => [...prev, ...newPics]);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPics();
  }, [page]);

  return (
    <div className={styles.photoList}>
      {loading && <p>Loading...</p>}
      {!loading &&
        photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavorite={isFav(photo.id)}
            onFavToggle={handleFavButton}
          />
        ))}
    </div>
  );
}

export default PhotoList;
