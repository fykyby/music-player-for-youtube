import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { MusicNoteList } from "react-bootstrap-icons";
import { Source } from "../App";

interface Props {
  data: any;
  setNewSource(data: Source): void;
  currentSource: Source | undefined;
}

export default function Result({
  data,
  setNewSource,
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
      const newSource = {
        id: data.id.videoId,
        title: data.snippet.title,
        channelTitle: data.snippet.channelTitle,
        thumbnail: data.snippet.thumbnails.default.url,
      };
      setNewSource(newSource);
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
