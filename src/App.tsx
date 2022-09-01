import React, { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";

export type Source = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
};

export default function App(): JSX.Element {
  const [currentPlaylist, setCurrentPlaylist] = useState<Array<Source>>([]);

  // useEffect(() => {
  //   console.log(currentPlaylist);
  // }, [currentPlaylist]);

  function setNewSource(data: Array<Source>): void {
    setCurrentPlaylist(data);
    console.log(data);
  }

  return (
    <div className={styles.App}>
      <Main setNewSource={setNewSource} currentSource={currentPlaylist[0]} />
      <Player currentPlaylist={currentPlaylist} />
    </div>
  );
}
