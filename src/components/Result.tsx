import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { MusicNoteList } from "react-bootstrap-icons";
import { Source } from "../App";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  data: any;
  currentSource: Source | undefined;
}

export default function Result({ data, currentSource }: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSource?.id === data.id.videoId) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSource, data]);

  async function handleClick(e: any) {
    e.preventDefault();
    if (data.id.kind === "youtube#video") {
      if (data.id.videoId === currentSource?.id) return;
      navigate(`/${data.id.videoId}`);
    } else if (data.id.kind === "youtube#playlist") {
      if (data.id.playlistid === currentSource?.id) return;
      navigate(`/${data.id.playlistId}`);
    }
  }

  return (
    <Link
      to={
        data.id.kind === "youtube#video"
          ? `/${data.id.videoId}`
          : `/${data.id.playlistId}`
      }
      className={`${styles.Video} ${
        playing && data.id.kind === "youtube#video" ? styles.playing : null
      }`}
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
    </Link>
  );
}
