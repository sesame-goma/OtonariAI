import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

const useVideo = (query: {}) => {
  const [videos, setVideos] = useState();
  const router = useRouter();
  const APIKEY = process.env.YOUTUBE_API_KEY;
  const queryJsonString = JSON.stringify(query);
  useEffect(() => {
    const category = query?.category ? query.category : "食レポ";
    const keyword = query.keyword ? query.keyword : "";
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&type=video&q=店 ${category} ${keyword}&part=id,snippet&maxResults=10&regionCode=jp`;

    const videofetch = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    };
    videofetch(searchURL).then((data) => {
      setVideos(data.items);
    });
  }, [queryJsonString]);

  return { videos };
};

export { useVideo };
