import { useEffect, useState } from "react";
import type { PexelPhoto } from "../../types/Types";
import fetchPexelPic from "../../api/Pexels";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "./PhotoList.module.css";

function PhotoList() {
  const [photos, setPhotos] = useState<PexelPhoto[]>([]);
  const [page] = useState(1);
  const [, setFav] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPics = async () => {
      setLoading(true);
      try {
        const newPics = await fetchPexelPic(page);
        setPhotos((prevPics) => [...prevPics, ...newPics]);
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
            isFav={false}
            onFavToggle={(photoId: number) => {
              setFav((prevFav) =>
                prevFav.includes(photoId)
                  ? prevFav.filter((id) => id !== photoId)
                  : [...prevFav, photoId]
              );
            }}
          />
        ))}
    </div>
  );
}

export default PhotoList;
