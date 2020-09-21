import useSWR from 'swr'
import Layout from '../components/Layout'
import { useUser } from '../utils/firebase/useUser'
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import SearchTop from '../components/SearchTop';
import { createStyles, createMuiTheme, Theme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../components/SimpleCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Router from 'next/router'

const theme = createMuiTheme();
theme.typography.h3 = {
  fontSize: '3vw',
  fontWeight: 400,
};
theme.typography.h4 = {
  fontSize: '2.5vw',
  fontWeight: 400,
};
theme.typography.h5 = {
  fontSize: '2vw',
  fontWeight: 400,
};
theme.typography.body1 = {
  fontSize: '1.2vw',
  fontWeight: 400,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: '#000',
    },
    fullWidthImg: {
      maxWidth: '100vw',
      width: '100vw',
      display: 'block',
      opacity: '0.6',
    },
    overText: {
      position: 'absolute',
      width: '100%',
      left: '0',
      top: 'calc(20% - 40px)',
      textAlign: 'center',
    },
    logoWrap: {
      width: '25vw',
      margin: '0 auto',
    },
    logo: {
      marginBottom: 20,
      width: '100%',
    },
    searchBox: {
      marginTop: '3vw',
      marginBottom: 50,
      width: '100%',
      margin: 'auto',
    },
    restaurantContainer: {
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: '#FFF59D',
      paddingTop: 20,
      paddingBottom: 50,
    },
    youtuberContainer: {
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: '#FFAB91',
      paddingTop: 20,
      marginTop: 0,
      paddingBottom: 50,
    },
    searchWord: {
      marginTop: 10,
    },
    category: {
      marginRight: 10,
      borderRadius: 30,
      height: 20,
    },
    categorySearch: {
      marginRight: 10,
    },
  })
)

// _app.tsxの共通スタイルを一部キャンセルする
export const getServerSideProps = async(context) => ({
  props: {
    top: true,
  }
})

const category = {
  japanese: '和食',
  european: '洋食',
  chinese: '中華',
  ramen: 'ラーメン',
  cafe: 'カフェ',
  sweet: 'スイート',
  chili: '激辛',
}

const submit = (key) => {
  const query = { [key]: true, keyword: `(${category[key]})` };

  Router.push({
    pathname: '/youtuber',
    query,
  })
}

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const IndexPage = () => {
  const { user, logout } = useUser()
  const {data, error} = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  )
  const classes = useStyles();

  return (
    <Layout title="Home | Jucy">
      <ThemeProvider theme={theme}>
        <div className={classes.mainContainer}>
          <img src="/top.jpg" className={classes.fullWidthImg} />
          <div className={classes.overText}>
            <div className={classes.logoWrap}>
              <img src="/logo_lg_wh.png" className={classes.logo} />
            </div>
            <Typography variant="h3" gutterBottom style={{color: "white"}}>
              かんたん、便利に食レポ依頼
            </Typography>
            <Typography variant="h5" gutterBottom style={{color: "white"}}>
              Youtuberに、あなたのお店の魅力を発信してもらいましょう
            </Typography>
            <div className={classes.searchBox}>
              <SearchTop />
              <div className={classes.searchWord}>
                <Typography variant="body2" style={{color: "#ddd"}}>
                <span className={classes.categorySearch}>
                  カテゴリ検索：
                </span>
                {Object.keys(category).map((key) => (
                    <Button variant="contained" color="default" onClick={() => submit(key)} className={classes.category}>
                      {category[key]}
                    </Button>
                  ))
                }
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.restaurantContainer}>
          <div style={{width: '45vw', margin: 'auto'}}>
            <div style={{marginTop: 20, marginBottom: 30}}>
              <div style={{textAlign: 'center'}}>
                <img src="/chef.png" style={{height: 100, marginBottom: 0,}} />
                <Typography variant="h4" component="h2" gutterBottom style={{textAlign: 'center', marginBottom: 20}}>
                  飲食店のみなさん
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  飲食店のユーザーは、Youtuberを探すことができます。
                </Typography>
              </div>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid item sm={12} md={4}>
                  <SimpleCard
                    src="/search.png"
                    title="1. 検索する"
                    body={`あなたのお店に最適なYoutuberを探しましょう。\n地域や料理のジャンルなどで検索することがポイントです。`}
                  />
                </Grid>
                <Grid item sm={12} md={4}>
                  <SimpleCard
                    src="/graph.png"
                    title="2. 分析する"
                    body={`Youtuberがリーチできる顧客層を知りましょう。\n若者向けや女性向けなど、効果的にターゲットを絞り込めます。`}
                  />
                </Grid>
                <Grid item sm={12} md={4}>
                  <SimpleCard
                    src="/handshake.png"
                    title="3. 依頼する"
                    body={`Youtuberに食レポを依頼してあなたのお店をPRしましょう。\nJucyに登録しているYoutuberが対象になります。`}
                  />
                </Grid>
              </Grid>
            </div>
            <div style={{marginTop: 30}}>
              <Link href="/eatery/login">
                <Button variant="contained" color="primary" disableElevation>
                  飲食店様ログイン
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.youtuberContainer}>
        <div style={{width: '45vw', margin: 'auto'}}>
          <div style={{marginTop: 20, marginBottom: 30}}>
            <div style={{textAlign: 'center'}}>
              <img src="/vlogger.png" style={{height: 100, marginBottom: 0,}} />
              <Typography variant="h4" component="h2" gutterBottom style={{marginBottom: 20}}>
                Youtuberのみなさん
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Youtuberは、依頼を待つことができます。
              </Typography>
            </div>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid item sm={12} md={4}>
                <SimpleCard
                  src="/key.png"
                  title="1. ログインする"
                  body={`Jucyにログインしましょう。\nGoogleアカウントと、YoutubeチャンネルIDでログインできます。`}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <SimpleCard
                  src="/talk.png"
                  title="2. 依頼を受ける"
                  body={`Jucyで飲食店から食レポ依頼を受けられます。\n依頼は一覧形式で表示することができます。`}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <SimpleCard
                  src="/youtube.png"
                  title="3. 食レポする"
                  body={`店舗へ赴き、食レポ動画を撮影しましょう。\nYoutubeに動画をアップロードして完了です。`}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{marginTop: 30}}>
            <Link href="/youtuber/login">
              <Button variant="contained" color="primary" disableElevation>
                Youtuberログイン
              </Button>
            </Link>
          </div>
        </div>
      </div>

      </ThemeProvider>
    </Layout>
  )
}

export default IndexPage
