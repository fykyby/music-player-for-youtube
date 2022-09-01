import styles from "../styles/Main.module.css";
import Search from "../pages/Search";
import { Source } from "../App";
import { Routes, Route, Navigate } from "react-router-dom";
import Playlist from "../pages/Playlist";
import { useState } from "react";

interface Props {
  setNewSource(data: Array<Source>): void;
  currentSource: Source | undefined;
}

// setNewSource("YdYwICNPDwI");
export default function Main({
  setNewSource,
  currentSource,
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
              setNewSource={setNewSource}
              currentSource={currentSource}
            />
          }
        />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/" element={<Navigate to="/search" />} />
      </Routes>
    </div>
  );
}
