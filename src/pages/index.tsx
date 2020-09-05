import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useUser } from '../utils/firebase/useUser'

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
  console.log(user);
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
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </Layout>
    )
  }

  return (
    <div>
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <p
          style={{
            display: 'inline-block',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </div>
      <div>
        <Link href={'/about'}>
          <a>Another example page</a>
        </Link>
      </div>
      {error && <div>Failed to fetch food!</div>}
      {data && !error ? (
        <div>Your favorite food is {data.food}.</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default IndexPage
