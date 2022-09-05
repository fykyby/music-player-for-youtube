import { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Redirect from "./components/Redirect";
import { shuffleArray } from "./misc";

export type Source = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  index: number;
};

export type Page = "Search" | "Playlist";

export default function App(): JSX.Element {
  const [currentPlaylist, setCurrentPlaylist] = useState<Array<Source>>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [page, setPage] = useState<Page>("Search");

  useEffect(() => {
    setCurrentSongIndex(0);
  }, [currentPlaylist]);

  function shufflePlaylist(): void {
    const newPlaylist = shuffleArray(currentPlaylist);
    newPlaylist.forEach((item, index) => {
      item.index = index;
    });
    setCurrentPlaylist([...newPlaylist]);
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.App}>
              <Main
                setNewPlaylist={setCurrentPlaylist}
                currentPlaylist={currentPlaylist}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                page={page}
              />
              <Player
                currentPlaylist={currentPlaylist}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                shufflePlaylist={shufflePlaylist}
              />
              <Navbar setPage={setPage} />
            </div>
          }
        />
        <Route
          path="/:id"
          element={<Redirect setNewPlaylist={setCurrentPlaylist} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
