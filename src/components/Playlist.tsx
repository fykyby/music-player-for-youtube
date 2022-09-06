import { Source } from "../App";
import PlaylistSong from "../components/PlaylistSong";
import styles from "../styles/Playlist.module.css";

interface Props {
  currentPlaylist: Array<Source>;
  currentSource: Source | undefined;
  setCurrentSongIndex(index: number): void;
  page: string;
}

export default function Playlist({
  currentPlaylist,
  currentSource,
  setCurrentSongIndex,
}: Props): JSX.Element {
  return (
    <section className={styles.Playlist}>
      {currentPlaylist.map((result, index) => {
        return (
          <PlaylistSong
            data={result}
            currentSource={currentSource}
            key={index}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        );
      })}
    </section>
  );
}
