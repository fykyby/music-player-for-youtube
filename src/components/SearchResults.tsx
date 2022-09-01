import Result from "./Result";
import styles from "../styles/SearchResults.module.css";
import { Source } from "../App";

interface Props {
  results: Array<any>;
  setNewSource(data: Source): void;
  currentSource: Source | undefined;
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
            setNewSource={setNewSource}
            key={index}
            currentSource={currentSource}
          />
        );
      })}
    </div>
  );
}
