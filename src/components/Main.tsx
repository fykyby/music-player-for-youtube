import styles from "../styles/Main.module.css";
import Search from "../pages/Search";
import { Source } from "../App";
import { Routes, Route, Navigate } from "react-router-dom";
import Playlist from "../pages/Playlist";
import { useState } from "react";

interface Props {
  setNewPlaylist(data: Array<Source>): void;
  currentPlaylist: Array<Source>;
  currentSongIndex: number;
  setCurrentSongIndex(index: number): void;
}

export default function Main({
  currentPlaylist,
  setNewPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
}: Props): JSX.Element {
  const [results, setResults] = useState<Array<Object>>([]);

  return (
    <div className={styles.Main}>
      <Routes>
        <Route
          path="/search"
          element={
            <Search
              results={results}
              setResults={setResults}
              setNewPlaylist={setNewPlaylist}
              currentSource={currentPlaylist[currentSongIndex]}
            />
          }
        />
        <Route
          path="/playlist"
          element={
            <Playlist
              currentPlaylist={currentPlaylist}
              currentSource={currentPlaylist[currentSongIndex]}
              setCurrentSongIndex={setCurrentSongIndex}
            />
          }
        />
        <Route path="/" element={<Navigate to="/search" />} />
      </Routes>
    </div>
  );
}
