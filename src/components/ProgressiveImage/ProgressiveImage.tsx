import { useState } from "react";
import styles from "./ProgressiveImg.module.css";
import type { ProgressiveImageProps } from "../../types/Types";

const ProgressiveImage = ({
  lowResSrc,
  highResSrc,
  alt,
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <img
        src={lowResSrc}
        alt={alt}
        className={`${styles.image} ${styles.low}`}
        loading="lazy"
      />
      <img
        src={highResSrc}
        alt={alt}
        className={`${styles.image} ${styles.high} ${
          isLoaded ? styles.loaded : ""
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
