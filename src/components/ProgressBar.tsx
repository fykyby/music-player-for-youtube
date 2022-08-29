import { useRef, useEffect, useState } from "react";
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
  const barRef = useRef<HTMLDivElement>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  function handleClick(e: any): void {
    let newTarget = e.target;
    if (e.target.children.length === 0) {
      newTarget = e.target.parentNode;
    }
    var rect = newTarget?.getBoundingClientRect();
    var x = e.clientX - rect.left;

    const percentage = x / newTarget.offsetWidth;
    const seconds = progressMax * percentage;

    seekTo(seconds);
  }

  useEffect(() => {
    setProgressPercentage((progressCurrent / progressMax) * 100);
  }, [progressCurrent]);

  return (
    <button className={styles.buttonContainer} onClick={(e) => handleClick(e)}>
      <div className={styles.container} ref={barRef}>
        <div
          className={styles.filler}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </button>
  );
}
