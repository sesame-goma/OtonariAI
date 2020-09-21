import Layout from '../../components/Layout'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Router, { useRouter } from 'next/router'
import { useChannel } from '../../utils/hooks/useChannel'
import useFormInput from '../../utils/hooks/useFormInput'
import ChannelList from '../../components/ChannelList'
import { item } from '../../types/youtuber/index';
import { useState, useContext } from 'react';
import { GlobalProvider, GlobalContext } from '../../utils/context/context';


const useStyles = makeStyles((theme) => ({
  rightSpace: {
    marginRight: theme.spacing(1),
  },
  mainContainer: {
    paddingTop: 30,
    paddingLeft: 16,
  },
  searchContainer: {
    padding: 30,
  }
}));

const ValidationTextField = withStyles({
  root: {
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const YoutuberIndex = () => {
  const classes = useStyles();
  const router = useRouter();
  const { channels, setChannelsResult }: Array<item> = useChannel(router.query);

  const minSubscriberCount = useFormInput();
  const maxSubscriberCount = useFormInput();
  const minViewCount = useFormInput();
  const maxViewCount = useFormInput();
  let word = String(router.query.keyword).replace(/\(.*/g, '');
  const baseKeyword = useFormInput(word);

  const [state, setState] = useState({
    japanese: false,
    european: false,
    chinese: false,
    ramen: false,
    cafe: false,
    sweet: false,
    chili: false,
  });
  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let searchKeyword = baseKeyword.value || '';
  if (Object.keys(state).some(i => state[i]===true)) searchKeyword += ' (';
  if (state.japanese) searchKeyword += '%7C和食';
  if (state.european) searchKeyword += '%7C洋食';
  if (state.chinese) searchKeyword += '%7C中華';
  if (state.ramen) searchKeyword += '%7Cラーメン';
  if (state.cafe) searchKeyword += '%7Cカフェ';
  if (state.sweet) searchKeyword += '%7Cスイート';
  if (state.chili) searchKeyword += '%7C激辛';
  if (Object.keys(state).some(i => state[i]===true)) searchKeyword += ')';

  let query = { keyword: searchKeyword };
  if (minSubscriberCount.value) query.minSubscriberCount = minSubscriberCount.value;
  if (maxSubscriberCount.value) query.maxSubscriberCount = maxSubscriberCount.value;
  if (minViewCount.value) query.minViewCount = minViewCount.value;
  if (maxViewCount.value) query.maxViewCount = maxViewCount.value;

  const context = useContext(GlobalContext);
  context.setChannelsResult(channels);
  const submit = () => {
    Router.push({
      pathname: '/youtuber',
      query,
    })
  }

  return (
    <GlobalContext.Provider value={{ channels, setChannelsResult }}>
      <Container maxWidth="md">
        <Layout title="Home | Jucy">
          <div className={classes.mainContainer}>
            <Paper className={classes.searchContainer}>
              <Typography variant="body2" color="textPrimary">
                おすすめカテゴリ
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.japanese}
                      onChange={handleChangeCheckBox}
                      name="japanese"
                    />
                  }
                  label="和食"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.european}
                      onChange={handleChangeCheckBox}
                      name="european"
                    />
                  }
                  label="洋食"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.chinese}
                      onChange={handleChangeCheckBox}
                      name="chinese"
                    />
                  }
                  label="中華"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ramen}
                      onChange={handleChangeCheckBox}
                      name="ramen"
                    />
                  }
                  label="ラーメン"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.cafe}
                      onChange={handleChangeCheckBox}
                      name="cafe"
                    />
                  }
                  label="カフェ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.sweet}
                      onChange={handleChangeCheckBox}
                      name="sweet"
                    />
                  }
                  label="スイーツ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.chili}
                      onChange={handleChangeCheckBox}
                      name="chili"
                    />
                  }
                  label="激辛"
                />
              </FormGroup>
              {/* スペース用に適当に入れた */}
              <Box mt={2}></Box>


              <Typography variant="body2" color="textPrimary">
                チャンネル登録者数
              </Typography>
              <ValidationTextField
                className={classes.rightSpace}
                variant="outlined"
                label="min"
                size="small"
                {...minSubscriberCount}
              />
              <ValidationTextField
                variant="outlined"
                label="max"
                size="small"
                {...maxSubscriberCount}
              />

              {/* スペース用に適当に入れた */}
              <Box mt={2}></Box>

              <Typography variant="body2" color="textPrimary">
                総視聴回数
              </Typography>
              <ValidationTextField
                className={classes.rightSpace}
                variant="outlined"
                label="min"
                size="small"
                {...minViewCount}
              />
              <ValidationTextField
                variant="outlined"
                label="max"
                size="small"
                {...maxViewCount}
              />

              {/* スペース用に適当に入れた */}
              <Box mt={1}></Box>

              <Typography variant="body1" color="textPrimary">
                フリーワード
              </Typography>
              <ValidationTextField variant="outlined" size="small" {...baseKeyword} />

              {/* スペース用に適当に入れた */}
              <Box mt={2}> </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                size="large"
              >
                検索する
              </Button>

            </Paper>
          </div>

          {/* スペース用に適当に入れた */}
          <Box mt={5}></Box>

          <Typography variant="h6" component="h1" gutterBottom>
            チャンネル検索結果
          </Typography>
          {channels && <ChannelList items={channels} />}
        </Layout>
      </Container>
    </GlobalContext.Provider>
  );
}

export default YoutuberIndex;
