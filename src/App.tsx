import { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

export type Source = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  index: number;
};

export default function App(): JSX.Element {
  const [currentPlaylist, setCurrentPlaylist] = useState<Array<Source>>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentSongIndex(0);
  }, [currentPlaylist]);

  function setNewPlaylist(data: Array<Source>): void {
    setCurrentPlaylist(data);
  }

  return (
    <BrowserRouter basename="/">
      <div className={styles.App}>
        <Main
          setNewPlaylist={setNewPlaylist}
          currentPlaylist={currentPlaylist}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
        />
        <Player
          currentPlaylist={currentPlaylist}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
        />
        <Navbar />
      </div>
    </BrowserRouter>
  );
}
