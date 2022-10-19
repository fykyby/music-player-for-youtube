import { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  const [page, setPage] = useState<Page>("Playlist");
  const [currentId, setCurrentId] = useState<string>();

  function setNewPlaylist(newPlaylist: Array<Source>) {
    setCurrentSongIndex(0);
    setCurrentPlaylist([...newPlaylist]);
  }

  function shufflePlaylist(): void {
    let newPlaylist = currentPlaylist;
    const currSrc = newPlaylist[currentSongIndex];
    newPlaylist.splice(currentSongIndex, 1);
    newPlaylist = shuffleArray(currentPlaylist);
    newPlaylist.unshift(currSrc);
    newPlaylist.forEach((item, index) => {
      item.index = index;
    });
    setNewPlaylist(newPlaylist);
  }

  const mainComponent = (
    <div className={styles.App}>
      <Main
        setNewPlaylist={setNewPlaylist}
        currentPlaylist={currentPlaylist}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        page={page}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Player
        currentPlaylist={currentPlaylist}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        shufflePlaylist={shufflePlaylist}
      />
      <Navbar setPage={setPage} page={page} />
    </div>
  );

  return (
    <BrowserRouter basename="/music-player-for-youtube">
      <Routes>
        <Route path="/" element={mainComponent} />
        <Route path="/:id" element={mainComponent} />
      </Routes>
    </BrowserRouter>
  );
}
