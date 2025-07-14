export interface PexelPhoto {
  id: number;
  photographer: string;
  src: {
    original: string;
    portrait: string
    medium: string;
    small: string;
  };
  alt: string;
}

export interface PhotoCardProps {
  photo: PexelPhoto;
  isFav: boolean;
  onFavToggle: (photoId: number) => void;
}
