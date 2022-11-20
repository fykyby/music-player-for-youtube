import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { Source } from "../App";
import { Link } from "react-router-dom";

interface Props {
  data: any;
  index: number;
  currentSource: Source | undefined;
  setCurrentSongIndex(index: number): void;
}

export default function PlaylistSong({
  data,
  currentSource,
  setCurrentSongIndex,
  index,
}: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (currentSource?.id === data.id) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSource, data]);

  async function handleClick(e: any) {
    e.preventDefault();
    if (currentSource?.id === data.id) return;
    setCurrentSongIndex(index);
  }

  return (
    <Link
      to={`/${data.id}`}
      className={`${styles.Video} ${playing ? styles.playing : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.thumbnailContainer}>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.channel}>{data.channelTitle}</div>
      </div>
    </Link>
  );
}
