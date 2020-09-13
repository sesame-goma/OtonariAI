import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const idFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const listItems = data.items.reduce((acc: Array<Object>, cur: Object) => {
    acc.push(cur.id.channelId);
    return acc;
  }, [])

  return listItems.join(',');
}

const chFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json()
  const listItems = data.items.reduce((acc: Array<Object>, cur: Object, idx: number) => {
    const obj = {
      key: idx,
      id: cur.id || "",
      title: cur.snippet.title || "no title",
      thumbnail: cur.snippet.thumbnails.default.url || "none",
      description: cur.snippet.description || "",
      subscriberCount: parseInt(cur.statistics.subscriberCount) || 0,
      viewCount: parseInt(cur.statistics.viewCount) || 0,
    }
    acc.push(obj);
    return acc;
  }, [])
  return listItems;
}

const chFilter = (data: [], query: {}) => {
  let filteredData = data;
  if (query.minSubscriberCount) {
    filteredData = filteredData.filter(item => item.subscriberCount > parseInt(query.minSubscriberCount));
  }
  if (query.maxSubscriberCount) {
    filteredData = filteredData.filter(item => item.subscriberCount < parseInt(query.maxSubscriberCount));
  }
  if (query.minViewCount) {
    filteredData = filteredData.filter(item => item.viewCount > parseInt(query.minViewCount));
  }
  if (query.maxViewCount) {
    filteredData = filteredData.filter(item => item.viewCount < parseInt(query.maxViewCount));
  }
  return filteredData;
}

const useChannel = (query: {}) => {
  const [channels, setChannels] = useState()
  const router = useRouter()

  const APIKEY = process.env.YOUTUBE_API_KEY
  const queryJsonString = JSON.stringify(query);
  useEffect(() => {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&type=channel&q=食レポ ${query.keyword}&part=id&maxResults=10&regionCode=jp`

    const fetch = async (url: string): Promise<Object | null> => {
      try {
        const ids: string = await idFetcher(url);
        const listURL = `https://www.googleapis.com/youtube/v3/channels?key=${APIKEY}&id=${ids}&part=id,snippet,statistics&maxResults=10&regionCode=jp`
        const data =await chFetcher(listURL);
        const filteredData = await chFilter(data, query);
        return filteredData;
      } catch (e) {
        console.log('error occured: ', e)
      }
      return null;
    }

    fetch(searchURL).then(data => setChannels(data));
  }, [queryJsonString]);

  return channels;
}

export { useChannel }
