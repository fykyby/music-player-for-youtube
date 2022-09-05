import Result from "../components/Result";
import styles from "../styles/Search.module.css";
import { Source } from "../App";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

interface Props {
  setNewPlaylist(data: Array<Source>): void;
  currentSource: Source | undefined;
  results: Array<Object>;
  setResults(results: Array<Object>): void;
  page: string;
}

export default function Search({
  results,
  setResults,
  setNewPlaylist,
  currentSource,
}: Props): JSX.Element {
  return (
    <div className={styles.Search}>
      <SearchBar setResults={(results) => setResults(results)} />
      <div className={styles.SearchResults}>
        {results.map((result, index) => {
          return (
            <Result
              data={result}
              setNewPlaylist={setNewPlaylist}
              key={index}
              currentSource={currentSource}
            />
          );
        })}
      </div>
    </div>
  );
}