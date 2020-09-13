import useSWR from 'swr'
import Layout from '../components/Layout'
import { useUser } from '../utils/firebase/useUser'
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Search from '../components/Search';

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

  return (
    <Layout title="Home | Jucy">
      <Typography variant="h2" component="h1" gutterBottom>
        Jucy
      </Typography>
      <Typography variant="h5" component="h1" gutterBottom>
        かんたん、便利に食レポ依頼
      </Typography>
      <div style={{
        backgroundColor: '#fff',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <img src="/top.jpg" style={{ opacity: 0.4, width: '100vw', height: '100vh' }} />
      </div>

      <div style={{ marginTop: 50, marginBottom: 50, }}>
        <Search />
      </div>
      <p>
        <Link href="/eatery/login" color="secondary">
          飲食店様ログイン
        </Link>
      </p>
      <p>
        <Link href="/youtuber/login" color="secondary">
          Youtuber様ログイン
        </Link>
      </p>
      <p
        style={{
          display: 'inline-block',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => logout()}
      >
        ログアウト
      </p>
      <p>
        <Link href='/about'>
          Another example page
        </Link>
      </p>
        {error && <div>Failed to fetch food!</div>}
        {data && !error ? (
          <div>Your favorite food is {data.food}.</div>
        ) : (
          <div>Loading...</div>
        )}
    </Layout>
  )
}

export default IndexPage
