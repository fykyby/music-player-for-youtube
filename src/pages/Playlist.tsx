import { Source } from "../App";
import PlaylistSong from "../components/PlaylistSong";

interface Props {
  currentPlaylist: Array<Source>;
  currentSource: Source | undefined;
  setCurrentSongIndex(index: number): void;
}

export default function Playlist({
  currentPlaylist,
  currentSource,
  setCurrentSongIndex,
}: Props): JSX.Element {
  return (
    <div>
      {currentPlaylist.map((result, index) => {
        return (
          <PlaylistSong
            data={result}
            currentSource={currentSource}
            key={index}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        );
      })}
    </div>
  );
}
