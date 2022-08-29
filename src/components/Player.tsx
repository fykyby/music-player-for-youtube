import { useState } from "react";
import YouTube from "react-youtube";

export default function Player(): JSX.Element {
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  function onPlayerReady(e: any): void {
    setPlayer(e.target);
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
    <div>
      <YouTube
        // style={{ display: "none" }}
        videoId={"YdYwICNPDwI"}
        onReady={(e) => onPlayerReady(e)}
        onStateChange={(e) => {
          handleStateChange(e);
        }}
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
    </div>
  );
}
