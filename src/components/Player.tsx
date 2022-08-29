import { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/Player.module.css";
import ProgressBar from "./ProgressBar";

export default function Player(): JSX.Element {
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [progressBarCompleted, setProgressBarCompleted] = useState<number>(0);
  const [progressBarMax, setProgressBarMax] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timer>();

  // ON SEEK
  // if (e.target.getCurrentTime() !== progressBarCompleted) {
  //   setCurrentTime();
  // }

  function startProgressTimer() {
    setProgressInterval(
      setInterval(() => {
        setCurrentTime();
      }, 1000)
    );
  }

  function clearProgressTimer() {
    clearInterval(progressInterval);
  }

  function setCurrentTime() {
    setProgressBarCompleted(player.getCurrentTime());
  }

  function onPlayerReady(e: any): void {
    setPlayer(e.target);
    setProgressBarMax(e.target.getDuration());
    e.target.playVideo();
    e.target.seekTo(0);
  }

  function handlePause(): void {
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function handleMute(): void {
    if (player.isMuted()) {
      player.unMute();
    } else {
      player.mute();
    }
  }

  function handleStateChange(e: any): void {
    if (e.data === 1) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }

  // https://developers.google.com/youtube/iframe_api_reference
  return (
    <div className={styles.Player}>
      <YouTube
        // style={{ display: "none" }}
        videoId={"YdYwICNPDwI"}
        onReady={(e) => onPlayerReady(e)}
        onStateChange={(e) => {
          handleStateChange(e);
        }}
        onPause={clearProgressTimer}
        onPlay={startProgressTimer}
        opts={{
          allow: "autoplay",
          playerVars: {
            start: 0,
            autoplay: 1,
          },
        }}
      />
      <button onClick={handlePause}>Pause/Play</button>
      <button onClick={handleMute}>Toggle Mute</button>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      <button
        onClick={() => {
          player.loadVideoById(inputVal);
        }}
      >
        Submit
      </button>
      {/* <ProgressBar
        completed={progressBarCompleted}
        maxCompleted={progressBarMax}
        customLabel=" "
        bgColor="black"
        baseBgColor="gray"
        height="10px"
        transitionDuration="0s"
      /> */}
      <ProgressBar
        completed={progressBarCompleted}
        completedMax={progressBarMax}
      />
      <p>{progressBarCompleted}</p>
      <p>{progressBarMax}</p>
    </div>
  );
}
