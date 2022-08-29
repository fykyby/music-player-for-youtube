import styles from "../styles/ProgressBar.module.css";

interface Props {
  progress: number;
  progressMax: number;
  seekTo(seconds: number): void;
}

export default function ProgressBar({
  progress: progressCurrent,
  progressMax,
  seekTo,
}: Props) {
  function handleChange(e: any) {
    seekTo(e.target.value);
  }

  return (
    <div className={styles.barContainer}>
      <input
        className={styles.progressBar}
        type="range"
        value={progressCurrent}
        min={0}
        max={progressMax}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
}
