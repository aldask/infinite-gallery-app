export interface PexelPhoto {
  id: number;
  photographer: string;
  src: {
    original: string;
    medium: string;
    small: string;
  };
  alt: string;
}
