import { useRef, useEffect, useState } from "react";
import styles from "../styles/ProgressBar.module.css";

interface Props {
  progress: number;
  progressMax: number;
  seekTo(seconds: number): void;
}

export default function ProgressBar({
  progress: completed,
  progressMax: completedMax,
  seekTo,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  // useEffect(() => {
  //   function handleClick(e: any): void {
  //     let newTarget = e.target;
  //     if (e.target.children.length === 0) {
  //       newTarget = e.target.parentNode;
  //     }
  //     var rect = newTarget?.getBoundingClientRect();
  //     var x = e.clientX - rect.left;

  //     const percentage = x / newTarget.offsetWidth;
  //     const seconds = completedMax * percentage;

  //     seekTo(seconds);
  //   }

  //   const current = barRef.current;
  //   current?.addEventListener("click", handleClick);

  //   return () => {
  //     current?.removeEventListener("click", handleClick);
  //   };
  // }, [completedMax]);

  function handleClick(e: any): void {
    let newTarget = e.target;
    if (e.target.children.length === 0) {
      newTarget = e.target.parentNode;
    }
    var rect = newTarget?.getBoundingClientRect();
    var x = e.clientX - rect.left;

    const percentage = x / newTarget.offsetWidth;
    const seconds = completedMax * percentage;

    seekTo(seconds);
  }

  useEffect(() => {
    setProgressPercentage((completed / completedMax) * 100);
  }, [completed]);

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
