import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/Player.module.css";
import miscStyles from "../styles/misc.module.css";
import ProgressBar from "./ProgressBar";
import { convertSeconds } from "../misc";
import {
  PlayFill,
  PauseFill,
  CaretLeftFill,
  CaretRightFill,
  ArrowRepeat,
  Shuffle,
} from "react-bootstrap-icons";
import { Source } from "../App";

interface Props {
  currentPlaylist: Array<Source>;
}

export default function Player({ currentPlaylist }: Props): JSX.Element {
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progressBarCurrent, setProgressBarCurrent] = useState<number>(0);
  const [progressBarMax, setProgressBarMax] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timer>();
  const [repeat, setRepeat] = useState<number>(0); // 0 - no repeat, 1 - repeat playlist, 2 - repeat song
  const [volume, setVolume] = useState<number>(20);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    player?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (currentPlaylist.length === 0) return;
    const newSource = currentPlaylist[0];
    setCurrentSongIndex(0);
    if (!newSource) return;
    changeSource(newSource.id);
  }, [currentPlaylist]);

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

  function handleRepeat(): void {
    if (repeat === 0) {
      setRepeat(1);
    } else if (repeat === 1) {
      setRepeat(2);
    } else {
      setRepeat(0);
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

  function handleEnd(): void {
    if (repeat === 1) {
      if (currentPlaylist.length - 1 === currentSongIndex) {
        restartPlaylist();
      }
    } else if (repeat === 2) {
      player.playVideo();
    }
  }

  function handleNext(): void {
    if (currentPlaylist.length - 1 === currentSongIndex) {
      restartPlaylist();
    } else {
      const newSource = currentPlaylist[currentSongIndex + 1];
      setCurrentSongIndex((prev) => prev + 1);
      changeSource(newSource.id);
    }
  }

  function restartPlaylist(): void {
    const newSource = currentPlaylist[0];
    setCurrentSongIndex(0);
    changeSource(newSource.id);
  }

  function handlePrevious(): void {
    if (progressBarCurrent > 4) {
      handleSeek(0);
    } else {
      if (0 === currentSongIndex) {
        const newSource = currentPlaylist[currentPlaylist.length - 1];
        setCurrentSongIndex(currentPlaylist.length - 1);
        changeSource(newSource.id);
      } else {
        const newSource = currentPlaylist[currentSongIndex - 1];
        setCurrentSongIndex((prev) => prev - 1);
        changeSource(newSource.id);
      }
    }
  }

  function shufflePlaylist(): void {
    console.log("shuffle");
  }

  function changeSource(id: string): void {
    setProgressTime(0);
    player.loadVideoById(id);
  }

  // function handleVolumeChange(e: any): void {
  //   setVolume(e.target.value);
  // }

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
        onEnd={handleEnd}
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
        <button
          className={`${miscStyles.button} ${miscStyles.smallButton}`}
          onClick={shufflePlaylist}
        >
          <Shuffle className={miscStyles.smallIcon} />
        </button>
        <button
          className={`${miscStyles.button} ${miscStyles.smallButton}`}
          onClick={handlePrevious}
        >
          <CaretLeftFill className={miscStyles.smallIcon} />
        </button>
        <button className={miscStyles.button} onClick={handlePause}>
          {playing ? (
            <PauseFill className={miscStyles.icon} />
          ) : (
            <PlayFill className={miscStyles.icon} />
          )}
        </button>
        <button
          className={`${miscStyles.button} ${miscStyles.smallButton}`}
          onClick={handleNext}
        >
          <CaretRightFill className={miscStyles.smallIcon} />
        </button>
        <button
          className={`${miscStyles.button} ${miscStyles.smallButton} 
          ${repeat !== 0 ? styles.buttonActive : null}
          `}
          onClick={handleRepeat}
        >
          <ArrowRepeat className={miscStyles.smallIcon} />
          {repeat === 2 ? <div className={styles.repeatVal}>1</div> : null}
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
