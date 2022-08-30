import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import miscStyles from "../styles/misc.module.css";
import { MusicNoteList } from "react-bootstrap-icons";

interface Props {
  data: any;
  playVideo(id: string): void;
  currentSource: string;
}

export default function Result({
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
    } else if (data.id.kind === "youtube#playlist") {
      // handle playlists/channels
      console.log(data);
    }
  }

  return (
    <div
      className={`${styles.Video} ${playing ? styles.playing : null}`}
      onClick={(e) => handleClick(e)}
    >
      <div className={styles.thumbnailContainer}>
        <img src={data.snippet.thumbnails.default.url} alt="thumbnail" />
        {data.id.kind === "youtube#playlist" ? (
          <MusicNoteList className={styles.playlistThumbnail} />
        ) : null}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{data.snippet.title}</div>
        <div className={styles.channel}>{data.snippet.channelTitle}</div>
      </div>
    </div>
  );
}
