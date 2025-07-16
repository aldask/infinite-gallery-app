export interface PexelPhoto {
  id: number;
  photographer: string;
  src: {
    original: string;
    portrait: string;
    medium: string;
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
