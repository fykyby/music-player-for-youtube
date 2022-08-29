import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/Player.module.css";
import miscStyles from "../styles/misc.module.css";
import ProgressBar from "./ProgressBar";
import { convertSeconds } from "../misc";
import { PlayFill, PauseFill } from "react-bootstrap-icons";

interface Props {
  sourceId: string;
}

export default function Player({ sourceId }: Props): JSX.Element {
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progressBarCurrent, setProgressBarCurrent] = useState<number>(0);
  const [progressBarMax, setProgressBarMax] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timer>();
  const [volume, setVolume] = useState<number>(20);

  useEffect(() => {
    player?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (sourceId.length === 0) return;
    changeSource(sourceId);
    setProgressTime(0);
  }, [sourceId]);

  function startProgressTimer(): void {
    setProgressInterval(
      setInterval(() => {
        setProgressTime(player.getCurrentTime());
      }, 1000)
    );
  }

  function clearProgressTimer(): void {
    clearInterval(progressInterval);
  }

  function setProgressTime(seconds: number): void {
    setProgressBarCurrent(seconds);
  }

  function onPlayerReady(e: any): void {
    setPlayer(e.target);
    setProgressBarMax(e.target.getDuration());
    e.target.setVolume(volume);
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
    if (e.target.getDuration() !== progressBarMax) {
      e.target.seekTo(0);
      setProgressBarMax(e.target.getDuration());
    }

    if (e.data === 1) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }

  function handleSeek(seconds: number): void {
    clearProgressTimer();
    player.seekTo(Math.floor(seconds), true);
    setProgressTime(seconds);
  }

  function changeSource(id: string): void {
    player.loadVideoById(id);
  }

  // function handleVolumeChange(e: any): void {
  //   setVolume(e.target.value);
  // }

  // https://developers.google.com/youtube/iframe_api_reference
  return (
    <div className={styles.Player}>
      <YouTube
        style={{ display: "none" }}
        videoId={""}
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
      <ProgressBar
        progress={progressBarCurrent}
        progressMax={progressBarMax}
        seekTo={handleSeek}
      />
      <div className={styles.progressCounters}>
        <p className={styles.progressCurent}>
          {convertSeconds(progressBarCurrent)}
        </p>
        <p className={styles.progressCurent}>
          {convertSeconds(progressBarMax)}
        </p>
      </div>
      <div className={styles.mainControls}>
        <button className={miscStyles.button} onClick={handlePause}>
          {playing ? (
            <PauseFill className={miscStyles.icon} />
          ) : (
            <PlayFill className={miscStyles.icon} />
          )}
        </button>
      </div>
      {/* <div className={styles.volumeControls}>
        <button className={styles.muteButton} onClick={handleMute}>
          Toggle Mute
        </button>
        <input
          className={styles.volumeSlider}
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => {
            handleVolumeChange(e);
          }}
        />
      </div> */}
    </div>
  );
}
