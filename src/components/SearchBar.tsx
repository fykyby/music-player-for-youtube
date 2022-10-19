import { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import miscStyles from "../styles/misc.module.css";
import { Search } from "react-bootstrap-icons";

interface Props {
  setResults(results: Array<any>): void;
}

export default function SearchBar({ setResults }: Props): JSX.Element {
  const [inputVal, setInputVal] = useState<string>("");

  async function getSearchResults() {
    if (inputVal === "") return;

    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?type=video&type=playlist&maxResults=15&q=${inputVal}&part=snippet&fields=items(id(kind%2C%20videoId%2C%20playlistId)%2C%20snippet(channelTitle%2C%20liveBroadcastContent%2C%20title%2C%20thumbnails%2Fdefault%2Furl))&key=${process.env.REACT_APP_API_KEY}`
    );
    const response = await data.json();

    const newResults: Array<Object> = [];
    response.items.forEach((result: any) => {
      if (result.snippet.liveBroadcastContent === "live") return;
      newResults.push(result);
    });

    setResults(newResults);
  }

  return (
    <div className={styles.SearchBar}>
      <div className={styles.inputContainer}>
        <input
          className={`${miscStyles.textInput} ${styles.searchInput}`}
          type="search"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") getSearchResults();
          }}
        />
        <button
          className={`${miscStyles.button} ${miscStyles.smallButton} ${styles.searchButton}`}
          id="searchBtn"
          onClick={getSearchResults}
        >
          <Search className="smallIcon" />
        </button>
      </div>
    </div>
  );
}
