import { useEffect, useState, useRef } from "react";
import type { PexelPhoto } from "../../types/Types";
import fetchPexelPic from "../../api/Pexels";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "./PhotoList.module.css";
import useFavorites from "../../hooks/useFavorites";
import loadingGif from "../../assets/loadingGif.gif";

function PhotoList() {
  const [photos, setPhotos] = useState<PexelPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasLoadedFirstPage, setHasLoadedFirstPage] = useState(false);
  const { isFav, handleFavButton } = useFavorites();

  const breakRef = useRef<HTMLDivElement | null>(null);
  const fetchedPages = useRef<Set<number>>(new Set());

  useEffect(() => {
    const loadPics = async () => {
      if (fetchedPages.current.has(page)) return;

      setLoading(true);
      fetchedPages.current.add(page);

      try {
        const newPics = await fetchPexelPic(page);

        setPhotos((previousPics) => {
          const oldPicsIds = previousPics.map((photo) => photo.id);
          const filteredNewPicsIds = newPics.filter(
            (photo) => !oldPicsIds.includes(photo.id)
          );

          return [...previousPics, ...filteredNewPicsIds];
        });

        if (page === 1) setHasLoadedFirstPage(true);
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

      if (isVisible && !loading && hasLoadedFirstPage) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    observer.observe(breakpoint);

    return () => {
      observer.unobserve(breakpoint);
    };
  }, [loading, hasLoadedFirstPage]);

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
        <p className={styles.loading}>
          <img src={loadingGif} alt="Loading more photos..." />
        </p>
      )}
      <div ref={breakRef} className={styles.sentinel}></div>
    </div>
  );
}

export default PhotoList;
