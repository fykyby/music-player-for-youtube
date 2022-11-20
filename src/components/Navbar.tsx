import styles from "../styles/Navbar.module.css";
import miscStyles from "../styles/misc.module.css";
import { Search, MusicNoteList } from "react-bootstrap-icons";
import { Page } from "../App";

interface Props {
  setPage(page: Page): void;
  page: Page;
}

export default function Navbar({ setPage, page }: Props): JSX.Element {
  return (
    <nav className={styles.Navbar}>
      <button
        onClick={() => setPage("Playlist")}
        className={`${styles.link} ${miscStyles.button} ${
          page === "Playlist" ? styles.active : ""
        }`}
      >
        <MusicNoteList className={miscStyles.smallIcon} />
      </button>
      <button
        onClick={() => setPage("Search")}
        className={`${styles.link} ${miscStyles.button} ${
          page === "Search" ? styles.active : ""
        }`}
      >
        <Search className={miscStyles.smallIcon} />
      </button>
    </nav>
  );
}
