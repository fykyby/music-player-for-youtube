import { useState } from "react";
import styles from "../styles/Main.module.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

interface Props {
  setNewSource(id: string): void;
}

// setNewSource("YdYwICNPDwI");
export default function Main({ setNewSource }: Props): JSX.Element {
  const [results, setResults] = useState<Array<Object>>([]);

  return (
    <div className={styles.Main}>
      <SearchBar setResults={(results) => setResults(results)} />
      <SearchResults results={results} setNewSource={setNewSource} />
    </div>
  );
}
