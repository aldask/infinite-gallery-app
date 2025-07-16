import { useEffect, useState } from "react";
import {
  displayFavPics,
  addFavPic,
  removeFavPic,
} from "../types/useLocalStorage";
import type { PexelPhoto } from "../types/Types";

export default function useFavorites() {
  const [favIds, setFavIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = displayFavPics().map((p) => p.id);
    setFavIds(stored);
  }, []);

  const isFav = (photoId: number) => favIds.includes(photoId);

  const handleFavButton = (photo: PexelPhoto) => {
    if (isFav(photo.id)) {
      removeFavPic(photo.id);
      setFavIds((prev) => prev.filter((id) => id !== photo.id));
    } else {
      addFavPic(photo);
      setFavIds((prev) => [...prev, photo.id]);
    }
  };

  return {
    isFav,
    handleFavButton,
  };
}
