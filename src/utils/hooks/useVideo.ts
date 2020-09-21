import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

const useVideo = (query: {}) => {
  const [videos, setVideos] = useState();
  const router = useRouter();
  const APIKEY = process.env.YOUTUBE_API_KEY;
  const queryJsonString = JSON.stringify(query);
  useEffect(() => {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&type=video&q=店&part=id,snippet&maxResults=10&regionCode=jp`;

    const videofetch = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    };
    videofetch(searchURL).then((data) => {
      setVideos(data.items);
      console.log(videos);
    });
  }, [queryJsonString]);

  return { videos };
};

export { useVideo };
