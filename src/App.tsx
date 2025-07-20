import styles from "./App.module.css";
import PhotoList from "./components/PhotoList/PhotoList";
import FavsList from "./components/Favorites/FavsList";
import { useState } from "react";

function App() {
  const [showFavs, setShowFavs] = useState(false);
  return (
    <main>
      <button className={styles.button} onClick={() => setShowFavs(true)}>
        Show Favorites
      </button>
      <PhotoList />
      <FavsList isOpen={showFavs} onClose={() => setShowFavs(false)} />
    </main>
  );
}

export default App;
