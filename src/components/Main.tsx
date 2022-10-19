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
  currentId: string | undefined;
  setCurrentId(id: string): void;
}

export default function Main({
  currentPlaylist,
  setNewPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
  page,
  currentId,
  setCurrentId,
}: Props): JSX.Element {
  const [currentPlaylistInfo, setCurrentPlaylistInfo] = useState<any>();
  const [customPositionClass, setCustomPositionClass] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function handleVideos() {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&part=contentDetails&fields=items(contentDetails%2FcontentRating%2C%20id%2C%20kind%2C%20snippet(channelTitle%2C%20liveBroadcastContent%2C%20thumbnails%2Fdefault%2Furl%2C%20title))&key=${process.env.REACT_APP_API_KEY}`
      );
      const response = await data.json();
      const video = response.items[0];

      if (
        !video ||
        video.snippet.liveBroadcastContent === "live" ||
        video.contentDetails.contentRating.ytRating === "ytAgeRestricted"
      ) {
        if (currentId) {
          navigate(`/${currentId}`);
        } else {
          navigate("/");
        }
        return;
      }

      const newSource = {
        id: video.id,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.default.url,
        index: 0,
      };

      setCurrentId(newSource.id);
      setCurrentPlaylistInfo(newSource);
      setNewPlaylist([newSource]);
    }

    async function handlePlaylists() {
      if (!id) return;
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${process.env.REACT_APP_API_KEY}`
      );
      const response = await data.json();
      const playlist = response.items[0];

      const newSource = {
        id: playlist.id,
        title: playlist.snippet.title,
        channelTitle: playlist.snippet.channelTitle,
        thumbnail: playlist.snippet.thumbnails.default.url,
      };

      const newPlaylist = await getPlaylistVideos(id);

      if (!newPlaylist) {
        if (currentId) {
          navigate(`/${currentId}`);
        } else {
          navigate("/");
        }
        return;
      }

      setCurrentId(newSource.id);
      setCurrentPlaylistInfo(newSource);
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
        setCustomPositionClass("");
        break;
      case "Search":
        setCustomPositionClass(styles.offScreenLeft);
        break;
    }
  }, [page]);

  return (
    <main className={`${styles.Main} ${customPositionClass}`}>
      <Playlist
        currentPlaylist={currentPlaylist}
        currentSource={currentPlaylist[currentSongIndex]}
        setCurrentSongIndex={setCurrentSongIndex}
        page={page}
        currentPlaylistInfo={currentPlaylistInfo}
      />
      <Search currentSource={currentPlaylist[currentSongIndex]} page={page} />
    </main>
  );
}
