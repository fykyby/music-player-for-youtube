import { useEffect, useState } from "react";
import styles from "../styles/ProgressBar.module.css";

interface Props {
  completed: number;
  completedMax: number;
}

export default function ProgressBar({ completed, completedMax }: Props) {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    setProgressPercentage((completed / completedMax) * 100);
  }, [completed]);

  return (
    <div className={styles.container}>
      <div
        className={styles.filler}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
