import { useEffect, useState } from "react";
import styles from "../styles/Result.module.css";
import { MusicNoteList } from "react-bootstrap-icons";
import { Source } from "../App";
import imgPlaceholder from "../images/black.png";

interface Props {
  data: any;
  setNewSource(data: Array<Source>): void;
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

  async function handleClick(e: any) {
    if (data.id.kind === "youtube#video") {
      const newSource = {
        id: data.id.videoId,
        title: data.snippet.title,
        channelTitle: data.snippet.channelTitle,
        thumbnail: data.snippet.thumbnails.default.url,
      };
      setNewSource([newSource]);
    } else if (data.id.kind === "youtube#playlist") {
      let newPlaylist: Array<any> = [];
      let nextPageToken = "";

      do {
        const playlistData: any = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?${
            nextPageToken ? `pageToken=${nextPageToken}` : ""
          }&part=snippet&maxResults=50&playlistId=${
            data.id.playlistId
          }&fields=nextPageToken%2C%20pageInfo%2C%20items%2Fsnippet(title%2C%20channelTitle%2C%20resourceId%2C%20thumbnails%2Fdefault(url))&key=${
            process.env.REACT_APP_API_KEY
          }`
        );
        const response = await playlistData.json();
        nextPageToken = response.nextPageToken;

        const filteredPlaylistData = response.items.map((item: any) => {
          let newItem;
          if (item.snippet.thumbnails.hasOwnProperty("default")) {
            newItem = {
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              channelTitle: item.snippet.channelTitle,
              thumbnail: item.snippet.thumbnails.default.url,
            };
          } else {
            newItem = {
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              channelTitle: item.snippet.channelTitle,
              thumbnail: imgPlaceholder,
            };
          }

          return newItem;
        });

        newPlaylist = [...newPlaylist, ...filteredPlaylistData];
      } while (nextPageToken);

      setNewSource(newPlaylist);
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
