import styles from "../styles/Navbar.module.css";
import miscStyles from "../styles/misc.module.css";
import { Link } from "react-router-dom";
import { Search, MusicNoteList } from "react-bootstrap-icons";

export default function Navbar(): JSX.Element {
  return (
    <div className={styles.Navbar}>
      <Link to="/playlist">
        <div className={styles.link}>
          <MusicNoteList className={miscStyles.smallIcon} />
        </div>
      </Link>
      <Link to="/search">
        <div className={styles.link}>
          <Search className={miscStyles.smallIcon} />
        </div>
      </Link>
    </div>
  );
}
