import { GetStaticProps } from 'next';
import Link from 'next/link';
import { VictoryPie } from "victory";

import { 
  Data,
  User,
 } from '../../types';
 import { Country } from '../../types/analytics';
import {
  sampleAnalyticData,
  sampleUserData
} from '../../utils/sample-data';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  dataCountries: any,
  items: User[]
}

const WithStaticProps = ({ items, dataCountries }: Props) => (
  <Layout title="Analytics | Jucy">
    <h1>Youtuber Analytics</h1>
    <List items={items} />
    <VictoryPie
      data={dataCountries}
      animate={{
        duration: 2000,
      }}
    />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getServerSideProps: GetStaticProps = async () => {
  const items: User[] = sampleUserData;
  const data: Data = sampleAnalyticData;
  const dataCountries: Array<object> = data.items[0].viewPercentWithCountry.map((
    item: Array<string | number>,
  ) => { 
    console.log(item[0]);
    console.log(Country[item[0]]); // ここら辺の型頑張りたい
    return {
      x: Country[item[0]],
      y: item[1],
    }
  });
  console.log(dataCountries);
  return { props: {
    items,
    dataCountries,
  } };
}

export default WithStaticProps
