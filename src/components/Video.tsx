import styles from "../styles/Video.module.css";

interface Props {
  data: any;
  playVideo(id: string): void;
}

export default function Video({ data, playVideo }: Props): JSX.Element {
  function handleClick(e: any): void {
    if (data.id.kind === "youtube#video") {
      playVideo(data.id.videoId);
    } else {
      // handle playlists/channels
    }
  }

  return (
    <div className={styles.Video} onClick={(e) => handleClick(e)}>
      <img src={data.snippet.thumbnails.default.url} alt="thumbnail" />
      <div className={styles.info}>
        <div className={styles.title}>{data.snippet.title}</div>
        <div className={styles.channel}>{data.snippet.channelTitle}</div>
      </div>
    </div>
  );
}
