import { useEffect, useState } from "react";
import styles from "../styles/Video.module.css";

interface Props {
  data: any;
  playVideo(id: string): void;
  currentSource: string;
}

export default function Video({
  data,
  playVideo,
  currentSource,
}: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (currentSource === data.id.videoId) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSource]);

  function handleClick(e: any): void {
    if (data.id.kind === "youtube#video") {
      playVideo(data.id.videoId);
    } else {
      // handle playlists/channels
    }
  }

  return (
    <div
      className={`${styles.Video} ${playing ? styles.playing : null}`}
      onClick={(e) => handleClick(e)}
    >
      <img src={data.snippet.thumbnails.default.url} alt="thumbnail" />
      <div className={styles.info}>
        <div className={styles.title}>{data.snippet.title}</div>
        <div className={styles.channel}>{data.snippet.channelTitle}</div>
      </div>
    </div>
  );
}
