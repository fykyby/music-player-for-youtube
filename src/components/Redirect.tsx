import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Source } from "../App";
import { getPlaylistVideos } from "../misc";

interface Props {
  setNewPlaylist(data: Array<Source>): void;
}

export default function Redirect({ setNewPlaylist }: Props): JSX.Element {
  const { id } = useParams();

  useEffect(() => {
    async function handleVideos() {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.REACT_APP_API_KEY}`
      );
      const response = await data.json();
      const video = response.items[0];

      if (!video) return;
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

      if (!newPlaylist) return;
      setNewPlaylist(newPlaylist);
    }

    if (!id) return;
    if (id[0] === "P" && id[1] === "L") {
      handlePlaylists();
    } else {
      handleVideos();
    }
  }, []);

  return <Navigate to="/" />;
}
