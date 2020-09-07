// You can include shared types/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/types';

export type User = {
  id: number
  name: string
}

type AgeAndGender = [
  string, // 年齢層
  string, // 性別
  number, // パーセンテージ
]

type ViewPercentWithCountry = [
  string, // 国コード
  number, // パーセンテージ
]


// 面倒なので一旦プリミティブ型だけで書いてる
export type Data = {
  code: number
  msg: string
  items: [ {
    ageAndGenderWithViewPercent : Array<Array<string | number>>
    viewPercentWithCountry : Array<Array<string | number>>
    weekActive : {
      mon: number
      tue: number
      wed: number
      thu: number
      fri: number
      sat: number
      sun: number
    },
    hourTimeActive : {
      '0': number
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
      '6': number
      '7': number
      '8': number
      '9': number
      '10': number
      '11': number
      '12': number
      '13': number
      '14': number
      '15': number
      '16': number
      '17': number
      '18': number
      '19': number
      '20': number
      '21': number
      '22': number
      '23': number
    },
    activeObserver : [ 
      {
        channelId : string
        commentDetails : [ 
          {
            content : string
            pubTime : number
            videoId : string
          },
        ],
      commonSubscriberChannel : [
          {
            channelId: string
            commonRatio: number
            commonSubscriber: Array<string>
          }
        ],
      },
    ],
  } ]
};