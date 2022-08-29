import React, { useEffect, useState } from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";
import Main from "./components/Main";

export default function App(): JSX.Element {
  const [currentSource, setCurrentSource] = useState<string>("");

  function setNewSource(id: string): void {
    setCurrentSource(id);
  }

  return (
    <div className={styles.App}>
      <Main setNewSource={setNewSource} />
      <Player sourceId={currentSource} />
    </div>
  );
}
