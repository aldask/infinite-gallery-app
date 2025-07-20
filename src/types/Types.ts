export interface PexelPhoto {
  id: number;
  photographer: string;
  src: {
    large2x: string;
    small: string;
  };
  alt: string;
}

export interface PhotoCardProps {
  photo: PexelPhoto;
  isFavorite: boolean;
  onFavToggle: (photo: PexelPhoto) => void;
  setting?: string;
}

export interface FavsListProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProgressiveImageProps {
  lowResSrc: string;
  highResSrc: string;
  alt: string;
}
