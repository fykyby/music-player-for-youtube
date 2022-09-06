import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { Source } from "../App";

interface Props {
  data: any;
  currentSource: Source | undefined;
  setCurrentSongIndex(index: number): void;
}

export default function PlaylistSong({
  data,
  currentSource,
  setCurrentSongIndex,
}: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (currentSource?.id === data.id) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSource, data]);

  async function handleClick() {
    if (currentSource?.index === data.index) return;
    setCurrentSongIndex(data.index);
  }

  return (
    <div
      className={`${styles.Video} ${playing ? styles.playing : null}`}
      onClick={handleClick}
    >
      <div className={styles.index}>{data.index + 1}</div>
      <div className={styles.thumbnailContainer}>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.channel}>{data.channelTitle}</div>
      </div>
    </div>
  );
}
