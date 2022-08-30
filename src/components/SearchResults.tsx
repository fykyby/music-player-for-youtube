import Result from "./Result";
import styles from "../styles/SearchResults.module.css";

interface Props {
  results: Array<any>;
  setNewSource(id: string): void;
  currentSource: string;
}

export default function SearchResults({
  results,
  setNewSource,
  currentSource,
}: Props): JSX.Element {
  return (
    <div className={styles.SearchResults}>
      {results.map((result, index) => {
        return (
          <Result
            data={result}
            playVideo={(id) => setNewSource(id)}
            key={index}
            currentSource={currentSource}
          />
        );
      })}
    </div>
  );
}
