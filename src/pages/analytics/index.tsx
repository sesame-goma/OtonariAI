import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import R from "ramda";

import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

import {
  Card,
  CardHeader,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  ListItem,
  Divider,
  Paper,
  List as muList,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import { Rating } from "@material-ui/lab";

import { AgeAndGender } from "../../types";
import { Data, User } from "../../types";
import { GlobalContext } from "../../utils/context/context";

import { Country, Gender, Age, DoW } from "../../types/analytics";
import { sampleAnalyticData, sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";
import YoutuberInfoPaper from "../../components/YoutuberInfoPaper";
import YoutubeVideo from "../../components/YoutubeVideo";
import { useStyles } from "../analytics/styles";
import useSWR from "swr";

const APIKEY = process.env.YOUTUBE_API_KEY;

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

const AgeAndGenderChart = ({ data }: dataAgeAndGender) => {
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

const OneDayChart = (props) => {
  const { data, max, day } = props;
  const domain = [0, max];
  const range = [1, 255];
  data.forEach((item) => delete item.day);
  return (
    <div>
      <ScatterChart
        width={800}
        height={60}
        margin={{
          top: 10,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <XAxis
          type="number"
          dataKey="hour"
          name="hour"
          interval={0}
          tick={{ fontSize: day === "日" ? 15 : 0 }}
          tickLine={{ transform: "translate(0, -6)" }}
        />

        <YAxis
          type="number"
          dataKey="index"
          height={10}
          width={80}
          tick={false}
          tickLine={false}
          axisLine={false}
          label={{ value: day, position: "insideRight" }}
        />
        <ZAxis type="number" dataKey="value" domain={domain} range={range} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

const WeekHourTimeActive = ({ data }: dataWeekActive) => {
  const maxValue = Math.max(...data.map((entry) => entry.value));
  const WoD = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <div>
      {WoD.map((item) => (
        <div>
          <OneDayChart
            data={data.filter((dayItem) => {
              if (dayItem.day === WoD.indexOf(item)) return true;
            })}
            max={maxValue}
            day={item}
          />
        </div>
      ))}
    </div>
  );
};

const videoFetcher = (url: string) => fetch(url, {
  method: "GET",
  headers: new Headers({ "Content-Type": "application/json" }),
}).then((res) => res.json());

const channelFetcher = (url: string) => fetch(url, {
  method: "GET",
  headers: new Headers({ "Content-Type": "application/json" }),
}).then((res) => res.json());

const Analytics = ({
  ch,
  vi,
  items,
  dataCountries,
  dataAgeAndGender,
  dataWeekActive,
}: Props) => {
  const { targetChannel } = useContext(GlobalContext);
  const [channel, setChannel] = useState(targetChannel || ch);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (!router.query) {
      router.push("/?type=error&message=チャンネルが存在しません");
      return;
    }
  }, []);

  const handleApply = () => {
    if(!router.query) { return; }
    router.push({
      pathname: "/reserve/apply",
      query: {
        id: router.query.id,
      },
    });
  };

  return (
    <Layout title="Analytics | Jucy">
      <div style={{ margin: 20 }}>
        <Grid classes={classes.root} container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                marginTop: 20,
                borderBottom: "1px solid black",
                fontWeight: "bold",
              }}
            >
              基本情報
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <YoutuberInfoPaper channel={channel} handleApply={handleApply} />
          </Grid>
          <Grid item xs={3}>
            <Card valiant="outlined" style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                チャンネル登録者数
              </Typography>
              <Typography variant="h3">
                {parseInt(channel?.subscriberCount).toLocaleString() || 100000}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card valiant="outlined" style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                総視聴者数
              </Typography>
              <Typography variant="h3">
                {parseInt(channel?.viewCount).toLocaleString() || 100000000}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card valiant="outlined" style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                動画投稿数
              </Typography>
              <Typography variant="h3">
                {parseInt(channel?.videoCount).toLocaleString() || 10000}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card valiant="outlined" style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                総コメント数
              </Typography>
              <Typography variant="h3">
                {parseInt(channel?.commentCount).toLocaleString() || 10000}
              </Typography>
            </Card>
          </Grid>


          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                marginTop: 20,
                borderBottom: "1px solid black",
                fontWeight: "bold",
              }}
            >
              最近の動画
            </Typography>
          </Grid>
          {Array.isArray(vi) && vi.map((video) => (
            <Grid item xs={4}>
              <YoutubeVideo video={video} />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                marginTop: 20,
                borderBottom: "1px solid black",
                fontWeight: "bold",
              }}
            >
              分析グラフ
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Card valiant="outlined" style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                地域
              </Typography>
              <PieChart width={300} height={300}>
                <Pie
                  isAnimationActive={false}
                  data={dataCountries}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                年齢・男女比
              </Typography>
              <AgeAndGenderChart data={dataAgeAndGender} />
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={{ padding: 20 }}>
              <Typography variant="h6" color="textSecondary">
                曜日・時間ごとの視聴率
              </Typography>
              <WeekHourTimeActive data={dataWeekActive} />
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetStaticProps = async (ctx: any) => {
  const chRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${APIKEY}&id=${ctx.query.id}&part=id,snippet,statistics&maxResults=10&regionCode=jp`,
    {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    }
  ).then((res) => res.json());
  const temp = chRes?.items?.reduce((acc: Array<Object>, cur: Object, idx: number) => {
    const obj = {
      key: idx,
      id: cur.id || "",
      title: cur.snippet.title || "no title",
      thumbnail: cur.snippet.thumbnails.default.url || "none",
      description: cur.snippet.description || "",
      subscriberCount: parseInt(cur.statistics.subscriberCount) || 0,
      viewCount: parseInt(cur.statistics.viewCount) || 0,
      videoCount: parseInt(cur.statistics.videoCount) || 0,
      commentCount: parseInt(cur.statistics.commentCount) || 0,
    }
    acc.push(obj);
    return acc;
  }, []);
  const ch = temp && temp[0];

  const viRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&part=snippet&channelId=${ctx.query.id}&q=%E9%A3%9F%E3%83%AC%E3%83%9D&maxResults=3&regionCode=jp&type=video`,
    {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    }
  ).then((res) => res.json());
  const vi = viRes?.items?.length !== -1 && viRes?.items;

  const items: User[] = sampleUserData;
  const data: Data = sampleAnalyticData;

  const dataCountries: Array<object> = data.items[0].viewPercentWithCountry.map(
    (item: Array<string | number>) => {
      return {
        name: Country[item[0]],
        value: item[1],
      };
    }
  );

  const dataAgeAndGender = data.items[0].ageAndGenderWithViewPercent.reduce(
    (acc: dataGender, curVal: AgeAndGender) => {
      if (curVal[1] == "female") {
        acc.push({
          name: curVal[0].slice(3, 6),
          female: curVal[2],
        });
      } else {
        acc[acc.length - 1]["male"] = curVal[2];
      }
      return acc;
    },
    []
  );

  const DoW_EN = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const dataWeekActive = Object.keys(data.items[0].weekActive).reduce(
    (accumulator, currentValue) => {
      return accumulator.concat(
        Object.keys(data.items[0].hourTimeActive).map((itemHour) => {
          return {
            day: DoW_EN.indexOf(currentValue),
            hour: Number(itemHour),
            value:
              data.items[0].weekActive[currentValue] *
              data.items[0].hourTimeActive[itemHour],
            index: 1,
          };
        })
      );
    },
    []
  );
  return {
    props: {
      ch,
      vi,
      items,
      dataCountries,
      dataAgeAndGender,
      dataWeekActive,
    },
  };
};

export default Analytics;
