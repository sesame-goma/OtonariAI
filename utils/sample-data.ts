import {
  Data, 
  User,
} from '../types'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
];

/** Dummy analytics data. */
export const sampleAnalyticData: Data = {
  code: 10000,
  msg: "Success",
  items: [ {
    ageAndGenderWithViewPercent: [ [ "age13-17", "female", 4.0 ], [ "age13-17", "male", 5.0 ], [ "age18-24", "female", 12.0 ], [ "age18-24", "male", 12.0 ], [ "age25-34", "female", 23.0 ], [ "age25-34", "male", 25.0 ], [ "age35-44", "female", 6.0 ], [ "age35-44", "male", 7.000000000000001 ], [ "age45-54", "female", 2.0 ], [ "age45-54", "male", 3.0 ], [ "age55-64", "female", 0.0 ], [ "age55-64", "male", 1.0 ], [ "age65-", "female", 0 ], [ "age65-", "male", 0 ] ],
    viewPercentWithCountry: [ [ "UM", 6 ], [ "VI", 3 ], [ "CA", 8 ], [ "US", 83 ] ],
    weekActive: {
      mon: 0.1216,
      tue: 0.1071,
      wed: 0.1416,
      thu: 0.1366,
      fri: 0.1562,
      sat: 0.1722,
      sun: 0.1647
    },
    hourTimeActive: {
      "22": 0.0455,
      "11": 0.0516,
      "23": 0.04,
      "12": 0.0601,
      "13": 0.0501,
      "14": 0.0531,
      "15": 0.0506,
      "16": 0.046,
      "17": 0.044,
      "18": 0.0415,
      "19": 0.0415,
      "0": 0.0305,
      "1": 0.0305,
      "2": 0.033,
      "3": 0.0355,
      "4": 0.03,
      "5": 0.0315,
      "6": 0.028,
      "7": 0.0395,
      "8": 0.044,
      "9": 0.034,
      "20": 0.0485,
      "21": 0.048,
      "10": 0.0425
    },
    activeObserver: [ 
      {
        channelId: "UC3kGBgwt3AhcpdSpwyjHE4g",
        commentDetails: [ 
          {
            content: "imagine having I girlfriend that would play Minecraft with you...",
            pubTime: 1582405286,
            videoId: "yncoNo7tr2s"
          },
        ],
      commonSubscriberChannel: [
          {
            channelId: "UCxSz6JVYmzVhtkraHWZC7HQ",
            commonRatio: 0.035,
            commonSubscriber: [ "UC2Tbav7HSZDneMc0ncTd-gA", "UCqRFyWuJRDRvXXqV9mygQpg", "UCgyZ0M3f6ssWp0GoFG8w0tQ", "UCTn9grf8A823c_OFGR70TEQ", "UCL9DoygLhTD3lfBgSX7TX9A", "UCO0IfPLAXVsBWrdgwvJ-Zow", "UC45btmso1BISZutSLzVhj8g" ]
          }
        ],
      },
    ],
  }]
};