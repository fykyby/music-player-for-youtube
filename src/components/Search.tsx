import Result from "../components/Result";
import styles from "../styles/Search.module.css";
import { Source } from "../App";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

interface Props {
  currentSource: Source | undefined;
  page: string;
}

export default function Search({ currentSource }: Props): JSX.Element {
  const [results, setResults] = useState<Array<any>>([]);

  return (
    <section className={styles.Search}>
      <SearchBar setResults={(results) => setResults(results)} />
      <div className={styles.SearchResults}>
        {results.map((result, index) => {
          if (result.snippet.liveBroadcastContent === "live") return null;

          return (
            <Result data={result} key={index} currentSource={currentSource} />
          );
        })}
      </div>
    </section>
  );
}
