import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { MusicNoteList } from "react-bootstrap-icons";
import { Source } from "../App";
import { getPlaylistVideos } from "../misc";

interface Props {
  data: any;
  setNewPlaylist(data: Array<Source>): void;
  currentSource: Source | undefined;
}

export default function Result({
  data,
  setNewPlaylist,
  currentSource,
}: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (currentSource?.id === data.id.videoId) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSource, data]);

  async function handleClick(e: any) {
    if (data.id.kind === "youtube#video") {
      const newSource = {
        id: data.id.videoId,
        title: data.snippet.title,
        channelTitle: data.snippet.channelTitle,
        thumbnail: data.snippet.thumbnails.default.url,
        index: 0,
      };
      setNewPlaylist([newSource]);
    } else if (data.id.kind === "youtube#playlist") {
      const newPlaylist = await getPlaylistVideos(data.id.playlistId);
      if (!newPlaylist) return;
      setNewPlaylist(newPlaylist);
    }
  }

  return (
    <div
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
    </div>
  );
}
