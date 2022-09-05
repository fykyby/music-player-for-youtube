import { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Redirect from "./components/Redirect";

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

  function setNewPlaylist(data: Array<Source>): void {
    setCurrentPlaylist(data);
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.App}>
              <Main
                setNewPlaylist={setNewPlaylist}
                currentPlaylist={currentPlaylist}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                page={page}
              />
              <Player
                currentPlaylist={currentPlaylist}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
              />
              <Navbar setPage={setPage} />
            </div>
          }
        />
        <Route
          path="/:id"
          element={<Redirect setNewPlaylist={setNewPlaylist} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
