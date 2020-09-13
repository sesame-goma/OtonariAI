import { GetStaticProps } from 'next';
import Link from 'next/link';
import { VictoryPie } from "victory";

import { 
  Data,
  User,
 } from '../../types';
import {
  sampleAnalyticData,
  sampleUserData
} from '../../utils/sample-data';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  data: Data,
  items: User[]
}

const WithStaticProps = ({ items, data }: Props) => (
  <Layout title="Analytics | Jucy">
    <h1>Youtuber Analytics</h1>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  const data: Data = sampleAnalyticData;
  return { props: { items, data } };
}

export default WithStaticProps
