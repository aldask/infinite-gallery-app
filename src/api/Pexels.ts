import type { PexelPhoto } from "../types/Types";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchPexelPic(page: number): Promise<PexelPhoto[]> {
  const response = await fetch(`${API_URL}?page=${page}&per_page=25`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!response.ok) {
    alert(`Failed to fetch images: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.photos as PexelPhoto[];
}

export default fetchPexelPic;
