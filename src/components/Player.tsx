import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/Player.module.css";
import miscStyles from "../styles/misc.module.css";
import inputRangeStyles from "../styles/ProgressBar.module.css";
import ProgressBar from "./ProgressBar";
import { convertSeconds } from "../misc";
import {
  PlayFill,
  PauseFill,
  CaretLeftFill,
  CaretRightFill,
  ArrowRepeat,
  Shuffle,
  VolumeUpFill,
  VolumeMuteFill,
} from "react-bootstrap-icons";
import { Source } from "../App";

interface Props {
  currentPlaylist: Array<Source>;
  currentSongIndex: number;
  setCurrentSongIndex(index: number): void;
  shufflePlaylist(): void;
}

export default function Player({
  currentPlaylist,
  setCurrentSongIndex,
  currentSongIndex,
  shufflePlaylist,
}: Props): JSX.Element {
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progressBarCurrent, setProgressBarCurrent] = useState<number>(0);
  const [progressBarMax, setProgressBarMax] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timer>();
  const [repeat, setRepeat] = useState<number>(0); // 0 - no repeat, 1 - repeat playlist, 2 - repeat song
  const [volume, setVolume] = useState<number>(20);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    player?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (currentPlaylist.length === 0 || !player) return;

    const newSource = currentPlaylist[currentSongIndex];
    if (!newSource) return;
    if (player.playerInfo?.videoData?.video_id === newSource.id) return;

    changeSource(newSource.id);
  }, [currentSongIndex, currentPlaylist, player]);

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
    if (repeat === 2) {
      player.playVideo();
    } else {
      handleNext();
    }
  }

  function restartPlaylist(): void {
    const newSource = currentPlaylist[0];
    setCurrentSongIndex(0);
    changeSource(newSource.id);
  }

  function handleNext(): void {
    if (currentPlaylist.length - 1 !== currentSongIndex) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (repeat === 1) {
      restartPlaylist();
    }
  }

  function handlePrevious(): void {
    if (progressBarCurrent > 4) {
      handleSeek(0);
    } else {
      if (0 === currentSongIndex) {
        setCurrentSongIndex(currentPlaylist.length - 1);
      } else {
        setCurrentSongIndex(currentSongIndex - 1);
      }
    }
  }

  function changeSource(id: string): void {
    try {
      setProgressTime(0);
      player.loadVideoById(id);
    } catch (err) {
      console.log(err);
    }
  }

  function handleMute(): void {
    if (player.isMuted()) {
      setMuted(false);
      player.unMute();
    } else {
      setMuted(true);
      player.mute();
    }
  }

  function handleVolumeChange(e: any): void {
    setVolume(e.target.value);
  }

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
        <div className={styles.playerControls}>
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
              ${repeat !== 0 ? miscStyles.active : null}
              `}
            onClick={handleRepeat}
          >
            <ArrowRepeat className={miscStyles.smallIcon} />
            {repeat === 2 ? <div className={styles.repeatVal}>1</div> : null}
          </button>
        </div>
        <div className={styles.volumeControls}>
          <button
            className={`${miscStyles.button} ${miscStyles.smallButton}`}
            onClick={handleMute}
          >
            {muted ? (
              <VolumeMuteFill className={miscStyles.smallIcon} />
            ) : (
              <VolumeUpFill className={miscStyles.smallIcon} />
            )}
          </button>
          <div className={styles.volumeBarContainer}>
            <input
              className={inputRangeStyles.progressBar}
              type="range"
              value={volume}
              min={0}
              max={100}
              onChange={(e) => {
                handleVolumeChange(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
