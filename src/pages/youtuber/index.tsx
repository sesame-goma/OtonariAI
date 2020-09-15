import Layout from '../../components/Layout'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Router, { useRouter } from 'next/router'
import { useChannel } from '../../utils/hooks/useChannel'
import useFormInput from '../../utils/hooks/useFormInput'
import ChannelList from '../../components/ChannelList'
import { item } from '../../types/youtuber/index';
import { useState } from 'react';

const YoutuberIndex = () => {
  const router = useRouter();
  const channels: Array<item> = useChannel(router.query);

  const minSubscriberCount = useFormInput();
  const maxSubscriberCount = useFormInput();
  const minViewCount = useFormInput();
  const maxViewCount = useFormInput();
  const baseKeyword = useFormInput(router.query.keyword);
  const [state, setState] = useState({
    ramen: false,
    sweet: false,
  });
  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let searchKeyword = baseKeyword.value;
  if (state.ramen) searchKeyword += ' ラーメン';
  if (state.sweet) searchKeyword += ' スイート';

  let query = { keyword: searchKeyword };
  if (minSubscriberCount.value) query.minSubscriberCount = minSubscriberCount.value;
  if (maxSubscriberCount.value) query.maxSubscriberCount = maxSubscriberCount.value;
  if (minViewCount.value) query.minViewCount = minViewCount.value;
  if (maxViewCount.value) query.maxViewCount = maxViewCount.value;

  const submit = () => {
    Router.push({
      pathname: '/youtuber',
      query,
    })
  }

  return (
    <Layout title="Home | Jucy">
      <Typography variant="body2" color="textSecondary">
        チャンネル登録者数
      </Typography>
      <TextField
        variant="outlined"
        label="min"
        {...minSubscriberCount}
      />
      <TextField
        variant="outlined"
        label="max"
        {...maxSubscriberCount}
      />

      <Typography variant="body2" color="textSecondary">
        総視聴回数
      </Typography>
      <TextField
        variant="outlined"
        label="min"
        {...minViewCount}
      />
      <TextField
        variant="outlined"
        label="max"
        {...maxViewCount}
      />

      <Typography variant="body2" color="textSecondary">
        おすすめカテゴリ
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={state.ramen} onChange={handleChangeCheckBox} name="ramen" />}
          label="ラーメン"
        />
        <FormControlLabel
          control={<Checkbox checked={state.sweet} onChange={handleChangeCheckBox} name="sweet" />}
          label="スイーツ"
        />
      </FormGroup>

      <Typography variant="body2" color="textSecondary">
        フリーワード
      </Typography>
      <TextField
        variant="outlined"
        {...baseKeyword}
      />

      {/* スペース用に適当に入れた */}
      <Box mt={2}>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={submit}
      >
       検索する
      </Button>

      {/* スペース用に適当に入れた */}
      <Box mt={5}>
      </Box>


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
