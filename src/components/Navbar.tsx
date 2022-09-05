import styles from "../styles/Navbar.module.css";
import miscStyles from "../styles/misc.module.css";
import { Search, MusicNoteList } from "react-bootstrap-icons";
import { Page } from "../App";

interface Props {
  setPage(page: Page): void;
}

export default function Navbar({ setPage }: Props): JSX.Element {
  return (
    <div className={styles.Navbar}>
      <button
        onClick={() => setPage("Playlist")}
        className={`${styles.link} ${miscStyles.button}`}
      >
        <MusicNoteList className={miscStyles.smallIcon} />
      </button>
      <button
        onClick={() => setPage("Search")}
        className={`${styles.link} ${miscStyles.button}`}
      >
        <Search className={miscStyles.smallIcon} />
      </button>
    </div>
  );
}
