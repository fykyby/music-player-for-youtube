import React from "react";
import "./styles/index.css";
import styles from "./styles/App.module.css";
import Player from "./components/Player";

export default function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <Player />
    </div>
  );
}
