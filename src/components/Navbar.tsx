import styles from "../styles/Navbar.module.css";
import miscStyles from "../styles/misc.module.css";
import { Link, useLocation } from "react-router-dom";
import { Search, MusicNoteList } from "react-bootstrap-icons";

export default function Navbar(): JSX.Element {
  const location = useLocation();

  return (
    <div className={styles.Navbar}>
      <Link to="/playlist">
        <div
          className={`${styles.link} ${
            location.pathname === "/playlist" ? styles.active : null
          }`}
        >
          <MusicNoteList className={miscStyles.smallIcon} />
        </div>
      </Link>
      <Link to="/search">
        <div
          className={`${styles.link} ${
            location.pathname === "/search" ? styles.active : null
          }`}
        >
          <Search className={miscStyles.smallIcon} />
        </div>
      </Link>
    </div>
  );
}
