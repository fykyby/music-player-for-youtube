import { useEffect, useState } from "react";
import styles from "../styles/Main.module.css";
import { Search } from "react-bootstrap-icons";

interface Props {
  setNewSource(id: string): void;
}

// setNewSource("YdYwICNPDwI");
export default function Main({ setNewSource }: Props): JSX.Element {
  const [inputVal, setInputVal] = useState<string>("");
  const [results, setResults] = useState<Array<Object>>([]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  async function getSearchResults() {
    if (inputVal === "") return;

    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=10&q=killing%20my%20love&part=snippet&key=${process.env.REACT_APP_API_KEY}`
    );
    const response = await data.json();

    const newResults: Array<Object> = [];
    response.items.forEach((result: Object) => {
      newResults.push(result);
    });
    setResults(newResults);
  }

  return (
    <div className={styles.Main}>
      <div className={styles.search}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button className="button smallButton" onClick={getSearchResults}>
          <Search className="smallIcon" />
        </button>
      </div>
      <div></div>
    </div>
  );
}
