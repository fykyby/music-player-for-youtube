import styles from "../styles/Main.module.css";
import Search from "./Search";
import { Source } from "../App";
import Playlist from "./Playlist";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistVideos } from "../misc";

interface Props {
  setNewPlaylist(data: Array<Source>): void;
  currentPlaylist: Array<Source>;
  currentSongIndex: number;
  setCurrentSongIndex(index: number): void;
  page: string;
}

export default function Main({
  currentPlaylist,
  setNewPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
  page,
}: Props): JSX.Element {
  const [margin, setMargin] = useState<string>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function handleVideos() {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.REACT_APP_API_KEY}`
      );
      const response = await data.json();
      const video = response.items[0];

      if (!video || video.snippet.liveBroadcastContent === "live") {
        navigate("/");
        return;
      }

      const newSource = {
        id: video.id,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.default.url,
        index: 0,
      };

      setNewPlaylist([newSource]);
    }

    async function handlePlaylists() {
      if (!id) return;
      const newPlaylist = await getPlaylistVideos(id);

      if (!newPlaylist) {
        navigate("/");
        return;
      }
      setNewPlaylist(newPlaylist);
    }

    if (!id) return;
    if (id[0] === "P" && id[1] === "L") {
      handlePlaylists();
    } else {
      handleVideos();
    }
  }, [id]);

  useEffect(() => {
    switch (page) {
      case "Playlist":
        setMargin("0%");
        break;
      case "Search":
        setMargin("-100%");
        break;
    }
  }, [page]);

  return (
    <main className={styles.Main} style={{ marginLeft: margin }}>
      <Playlist
        currentPlaylist={currentPlaylist}
        currentSource={currentPlaylist[currentSongIndex]}
        setCurrentSongIndex={setCurrentSongIndex}
        page={page}
      />
      <Search currentSource={currentPlaylist[currentSongIndex]} page={page} />
    </main>
  );
}
