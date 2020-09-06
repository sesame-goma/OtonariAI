import useSWR from 'swr'
import Layout from '../components/Layout'
import { useUser } from '../utils/firebase/useUser'
import Typography from '@material-ui/core/Typography';
import Link from '../src/Link';
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
  if (!user) {
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hell Next.js 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
        <p>
          <Link href="/eatery/login">
            <a>Login</a>
          </Link>
        </p>
      </Layout>
    )
  }

  return (
    <>
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
        <img src="top.jpg" style={{ opacity: 0.4, }} />
      </div>

      <div style={{ marginTop: 50, marginBottom: 50, }}>
        <Search />
      </div>
      <p>
        <Link href="/login" color="secondary">
          ログイン
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
    </>
  )
}

export default IndexPage
