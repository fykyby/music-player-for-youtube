import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

export default function Player(): JSX.Element {
  // const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [videoID, setVideoID] = useState<string>("YdYwICNPDwI");

  function onPlayerReady(e: any): void {
    setPlayer(e.target);
  }

  function handlePause(): void {
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function handleStateChange(e: any): void {
    console.log(e.data);
    if (e.data === 1) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }

  return (
    <div>
      <YouTube
        videoId={videoID}
        onReady={(e) => onPlayerReady(e)}
        onStateChange={(e) => {
          handleStateChange(e);
        }}
      />
      <button onClick={handlePause}>Pause/Play</button>
    </div>
  );
}
