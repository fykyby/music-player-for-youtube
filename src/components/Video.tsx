import styles from "../styles/Video.module.css";

interface Props {
  data: any;
}

export default function Video({ data }: Props): JSX.Element {
  return (
    <div className={styles.Video}>
      <img src={data.snippet.thumbnails.default.url} alt="thumbnail" />
      <div className={styles.title}>{data.snippet.title}</div>
    </div>
  );
}
