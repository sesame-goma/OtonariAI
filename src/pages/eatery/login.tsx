import Link from 'next/link'
import Layout from '../../components/Layout'
import FirebaseAuth from '../../components/FirebaseAuth'

const LoginPage = () => (
  <Layout title="Login | Next.js + TypeScript Example">
    <h1>Login 🗝</h1>
    <div>
      <FirebaseAuth />
    </div>
    <p>
      <Link href="/">
        <a>home</a>
      </Link>
    </p>
  </Layout>
)

export default LoginPage
