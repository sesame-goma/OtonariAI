import { GetStaticProps } from "next";
import Link from "next/link";
import {
  VictoryGroup,
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
} from "victory";

import { AgeAndGender } from "../../types";
import { Data, User } from "../../types";

import { Country, Gender, Age, DoW } from "../../types/analytics";
import { sampleAnalyticData, sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";

type Props = {
  dataCountries: any;
  dataAgeAndGender: any;
  dataWeekActive: any;
  items: User[];
};

export type dataGender = {
  male: dataAge[];
  female: dataAge[];
};

export type dataAge = {
  x: string;
  y: number;
};

const WithStaticProps = ({
  items,
  dataCountries,
  dataAgeAndGender,
  dataWeekActive,
}: Props) => (
  <Layout title="Analytics | Jucy">
    <h1>Youtuber Analytics</h1>
    <VictoryPie
      theme={VictoryTheme.material}
      data={dataCountries}
      animate={{
        duration: 2000,
      }}
    />

    <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 8 }}>
      <VictoryGroup offset={10} colorScale={["#6699FF", "#FF99CC"]}>
        <VictoryBar data={dataAgeAndGender.male} />
        <VictoryBar data={dataAgeAndGender.female} />
      </VictoryGroup>
    </VictoryChart>

    <div>曜日・時間ごとの視聴率</div>
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [0, 8], y: [0, 25] }}
    >
      <VictoryAxis style={{ ticks: { padding: 5 } }} />
      <VictoryScatter
        style={{ data: { fill: "#c43a31" } }}
        bubbleProperty="amount"
        maxBubbleSize={5}
        minBubbleSize={1}
        data={dataWeekActive}
      />
    </VictoryChart>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetStaticProps = async () => {
  const items: User[] = sampleUserData;
  const data: Data = sampleAnalyticData;

  const dataCountries: Array<object> = data.items[0].viewPercentWithCountry.map(
    (item: Array<string | number>) => {
      return {
        x: Country[item[0]],
        y: item[1],
      };
    }
  );

  const dataAgeAndGender = data.items[0].ageAndGenderWithViewPercent.reduce(
    (accumulator: dataGender, currentValue: AgeAndGender) => {
      if (currentValue[1] == "male") {
        return {
          male: accumulator.male.concat({
            x: currentValue[0].slice(3, 6),
            y: currentValue[2],
          }),
          female: accumulator.female,
        };
      } else {
        return {
          male: accumulator.male,
          female: accumulator.female.concat({
            x: currentValue[0].slice(3, 6),
            y: currentValue[2],
          }),
        };
      }
    },
    { male: [], female: [] }
  );
  const dataWeekActive = Object.keys(data.items[0].weekActive).reduce(
    (accumulator, currentValue) => {
      return accumulator.concat(
        Object.keys(data.items[0].hourTimeActive).map((itemHour) => {
          return {
            x: DoW[currentValue],
            y: Number(itemHour),
            amount:
              data.items[0].weekActive[currentValue] *
              data.items[0].hourTimeActive[itemHour],
          };
        })
      );
    },
    []
  );
  console.log(dataAgeAndGender);
  return {
    props: {
      items,
      dataCountries,
      dataAgeAndGender,
      dataWeekActive,
    },
  };
};

export default WithStaticProps;
