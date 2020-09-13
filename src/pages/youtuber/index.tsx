import Layout from '../../components/Layout'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import { useChannel } from '../../utils/hooks/useChannel'
import ChannelList from '../../components/ChannelList'
import { item } from '../../types/youtuber/index';

// const YoutuberIndex = ({query}) => {
const YoutuberIndex = () => {
  const router = useRouter();
  const channels: Array<item> = useChannel(router.query.keyword);
  console.log('channel', channels)

  return (
    <Layout title="Home | Jucy">
      <Typography variant="h4" component="h1" gutterBottom>
        チャンネル検索結果
      </Typography>
      {channels &&  (
        <ChannelList items={channels} />
      )}
    </Layout>
  )
}

export default YoutuberIndex;