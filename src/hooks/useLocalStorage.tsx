import type { PexelPhoto } from "../types/Types";

export function displayFavPics(): PexelPhoto[] {
  const favPics = localStorage.getItem("favPics");

  if (favPics) {
    return JSON.parse(favPics) as PexelPhoto[];
  }
  return [];
}

export function addFavPic(pic: PexelPhoto): void {
  const favPics = displayFavPics();
  favPics.push(pic);
  localStorage.setItem("favPics", JSON.stringify(favPics));
}

export function removeFavPic(picId: number): void {
  const favPics = displayFavPics();
  const updatedFavPics = favPics.filter((pic) => pic.id !== picId);
  localStorage.setItem("favPics", JSON.stringify(updatedFavPics));
}
