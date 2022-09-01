import { useState } from "react";
import styles from "../styles/Main.module.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Source } from "../App";

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
      <SearchBar setResults={(results) => setResults(results)} />
      <SearchResults
        results={results}
        setNewSource={setNewSource}
        currentSource={currentSource}
      />
    </div>
  );
}
