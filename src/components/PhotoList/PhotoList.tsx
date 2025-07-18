import { useEffect, useState, useRef } from "react";
import type { PexelPhoto } from "../../types/Types";
import fetchPexelPic from "../../api/Pexels";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "./PhotoList.module.css";
import useFavorites from "../../hooks/useFavorites";

function PhotoList() {
  const [photos, setPhotos] = useState<PexelPhoto[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isFav, handleFavButton } = useFavorites();

  const breakRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadPics = async () => {
      setLoading(true);
      try {
        const newPics = await fetchPexelPic(page);

        setPhotos((previousPics) => {
          const oldPicsIds = previousPics.map((photo) => photo.id);
          const filteredNewPicsIds = newPics.filter(
            (photo) => !oldPicsIds.includes(photo.id)
          );

          return [...previousPics, ...filteredNewPicsIds];
        });
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPics();
  }, [page]);

  useEffect(() => {
    const breakpoint = breakRef.current;
    if (!breakpoint) return;

    const observer = new IntersectionObserver((entry) => {
      const isVisible = entry[0].isIntersecting;

      if (isVisible && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    observer.observe(breakpoint);

    return () => {
      observer.unobserve(breakpoint);
    };
  }, [loading]);

  return (
    <div className={styles.photoList}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={isFav(photo.id)}
          onFavToggle={handleFavButton}
        />
      ))}
      {loading && photos.length > 0 && (
        <p className={styles.loading}>Loading more photos...</p>
      )}
      <div ref={breakRef} className={styles.sentinel}></div>
    </div>
  );
}

export default PhotoList;
