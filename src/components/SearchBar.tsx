import { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { Search } from "react-bootstrap-icons";

interface Props {
  setResults(results: Array<any>): void;
}

export default function SearchBar({ setResults }: Props): JSX.Element {
  const [inputVal, setInputVal] = useState<string>("");

  async function getSearchResults() {
    if (inputVal === "") return;

    // type %2C%20playlist
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?type=video&maxResults=15&q=${inputVal}&part=snippet&key=${process.env.REACT_APP_API_KEY}`
    );
    const response = await data.json();

    const newResults: Array<Object> = [];
    response.items.forEach((result: Object) => {
      newResults.push(result);
    });

    setResults(newResults);
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") getSearchResults();
        }}
      />
      <button className="button smallButton" onClick={getSearchResults}>
        <Search className="smallIcon" />
      </button>
    </div>
  );
}
