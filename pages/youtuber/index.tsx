import Layout from '../../components/Layout'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ChannelList from '../../components/ChannelList'

const fetcher = (url: string) =>
  fetch(url, {
    mode: 'cors',
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  }).then(res => {
    return res.json()
  }).then(data => {
    console.log('data', data)
    const listItems = data.reduce((acc: Array<Object>, cur: Object, idx: number) => {
      const obj = {
        key: idx,
        id: cur.id.channelId || "",
        title: cur.snippet.title || "no title",
        thumbnail: cur.snippet.thumbnails.default.url || "none",
        description: cur.snippet.description || ""
      }
      acc.push(obj);
      return acc;
    }, [])
    console.log('listItem', listItems)
    return listItems;
  }).catch(e => {
    console.log('error', e);
  })

// const YoutuberIndex = ({query}) => {
const YoutuberIndex = () => {
  const router = useRouter();
  const {data, error} = useSWR(
    `https://us-central1-jucy-9eb2d.cloudfunctions.net/searchYoutuber?q=${router.query.keyword}`,
    fetcher
  );

  return (
    <Layout title="Home | Jucy">
      <Typography variant="h2" component="h1" gutterBottom>
        Youtuber検索結果
      </Typography>
      {data &&  (
        <ChannelList items={data} />
      )}
    </Layout>
  )
}

export default YoutuberIndex;