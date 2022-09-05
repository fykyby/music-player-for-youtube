import styles from "../styles/Main.module.css";
import Search from "./Search";
import { Source } from "../App";
import Playlist from "./Playlist";
import { useEffect, useState } from "react";

interface Props {
  setNewPlaylist(data: Array<Source>): void;
  currentPlaylist: Array<Source>;
  currentSongIndex: number;
  setCurrentSongIndex(index: number): void;
  page: string;
}

export default function Main({
  currentPlaylist,
  setNewPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
  page,
}: Props): JSX.Element {
  const [results, setResults] = useState<Array<Object>>([]);
  const [margin, setMargin] = useState<string>();

  useEffect(() => {
    switch (page) {
      case "Playlist":
        setMargin("0%");
        break;
      case "Search":
        setMargin("-100%");
    }
  }, [page]);

  return (
    <div className={styles.Main} style={{ marginLeft: margin }}>
      <Playlist
        currentPlaylist={currentPlaylist}
        currentSource={currentPlaylist[currentSongIndex]}
        setCurrentSongIndex={setCurrentSongIndex}
        page={page}
      />
      <Search
        results={results}
        setResults={setResults}
        setNewPlaylist={setNewPlaylist}
        currentSource={currentPlaylist[currentSongIndex]}
        page={page}
      />
    </div>
  );
}
