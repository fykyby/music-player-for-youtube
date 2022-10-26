import { Source } from "../App";
import PlaylistSong from "../components/PlaylistSong";
import styles from "../styles/Playlist.module.css";

interface Props {
  currentPlaylist: Array<Source>;
  currentSource: Source | undefined;
  setCurrentSongIndex(index: number): void;
  page: string;
  currentPlaylistInfo: any;
}

export default function Playlist({
  currentPlaylist,
  currentSource,
  setCurrentSongIndex,
  currentPlaylistInfo,
}: Props): JSX.Element {
  return (
    <section className={styles.Playlist}>
      {currentPlaylistInfo ? (
        <div className={styles.titleBar}>
          <div className={styles.titleName}>{currentPlaylistInfo.title}</div>
          <div className={styles.titleChannel}>
            {currentPlaylistInfo.channelTitle}
          </div>
        </div>
      ) : (
        <div className={styles.titleBar}></div>
      )}

      {currentPlaylist.map((result, index) => {
        return (
          <PlaylistSong
            data={result}
            index={index}
            currentSource={currentSource}
            key={index}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        );
      })}
    </section>
  );
}
