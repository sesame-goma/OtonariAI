import { GetStaticProps } from "next";
import R from 'ramda';
import {
  VictoryGroup,
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
} from "victory";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import { 
  Card,
  CardHeader,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { AgeAndGender } from "../../types";
import { Data, User } from "../../types";

import { Country, Gender, Age, DoW } from "../../types/analytics";
import { sampleAnalyticData, sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { useStyles } from "../analytics/styles";

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

const AgeAndGenderChart = (data: dataAgeAndGender) => {
  console.log(Array.isArray(data));
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="male" fill="#8884d8" />
      <Bar dataKey="female" fill="#82ca9d" />
    </BarChart>
  );
};

const WithStaticProps = ({
  items,
  dataCountries,
  dataAgeAndGender,
  dataWeekActive,
}: Props) => {
  const classes = useStyles();
  console.log(Array.isArray(dataAgeAndGender));
  return (
    <Layout classes={classes.root} title="Analytics | Jucy">
      <GridList cols={3} spacing={50} cellHeight={500}>
        <GridListTile>
          <Card>
            <CardHeader title="地域" />
            <VictoryPie
              theme={VictoryTheme.material}
              data={dataCountries}
              animate={{
                duration: 2000,
              }}
            />
          </Card>
        </GridListTile>

        <GridListTile>
          <Card>
            <CardHeader title="年齢・男女比" />
            {AgeAndGenderChart(dataAgeAndGender)}
          </Card>
        </GridListTile>

        <GridListTile>
          <Card>
            <CardHeader title="曜日・時間ごとの視聴率" />
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
          </Card>
        </GridListTile>
      </GridList>
    </Layout>
  );
};

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

  const dataAgeAndGender = data.items[0].ageAndGenderWithViewPercent.reduce((
    acc: dataGender, curVal: AgeAndGender
  ) => {
    if (curVal[1] == 'female') {
      acc.push({
        name: curVal[0].slice(3, 6),
        female: curVal[2],
      });
    } else {
      acc[acc.length -1]['male'] = curVal[2];
    }
    return acc;
  }, []);

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
