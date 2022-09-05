import imgPlaceholder from "./images/black.png";

export function convertSeconds(seconds: number): string {
  let result = new Date(seconds * 1000).toISOString().substr(11, 8);
  if (result[0] === "0" && result[1] === "0") {
    result = result.slice(3, result.length);
  }
  return result;
}

export async function getPlaylistVideos(id: string) {
  try {
    let newPlaylist: Array<any> = [];
    let nextPageToken = "";

    do {
      const playlistData: any = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?${
          nextPageToken ? `pageToken=${nextPageToken}` : ""
        }&part=snippet&maxResults=50&playlistId=${id}&fields=nextPageToken%2C%20pageInfo%2C%20items%2Fsnippet(title%2C%20channelTitle%2C%20resourceId%2C%20thumbnails%2Fdefault(url))&key=${
          process.env.REACT_APP_API_KEY
        }`
      );
      const response = await playlistData.json();
      nextPageToken = response.nextPageToken;

      const filteredPlaylistData = response.items.map((item: any) => {
        let newItem;
        if (item.snippet.thumbnails.hasOwnProperty("default")) {
          newItem = {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.default.url,
          };
        } else {
          newItem = {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnail: imgPlaceholder,
          };
        }

        return newItem;
      });

      newPlaylist = [...newPlaylist, ...filteredPlaylistData];
    } while (nextPageToken);

    newPlaylist.forEach((item, index) => {
      item.index = index;
    });

    return newPlaylist;
  } catch (err) {
    console.log(err);
  }
}

export function shuffleArray(arr: Array<any>): Array<any> {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
