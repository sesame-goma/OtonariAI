import { google } from 'googleapis'
// const { google } = require("googleapis");
// kuroda's key
const youtubeAPIKey = "AIzaSyARoVVgG7-XaNHkQnAlOvvCG4qpnIEgkic";
// terui's key
// const youtubeAPIKey = "AIzaSyDWxxEn9N9_hzNcHFt30SzDGgu4W-sJUi4";
const youtube = google.youtube({ version: "v3", auth: youtubeAPIKey });
/**
 * httpリクエストをトリガーにYoutubeからデータを取得する処理を発火して、返ってきたJSONを表示する
 */
exports.searchYoutuber = functions.https.onRequest(async (request, response) => {
    const q = request.query.q;
    const latestVideoIds = await searchYoutuberWithAPI(q);

    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s
    response.header('Access-Control-Allow-Origin', '*');
    if (request.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      response.set('Access-Control-Allow-Methods', 'GET');
      response.set('Access-Control-Allow-Headers', 'Content-Type');
      response.set('Access-Control-Max-Age', '3600');
      response.status(204).send('');
    } else {
      response.send(latestVideoIds);
    }
  }
);


/**
 * 食レポYoutuberを検索して返す
 */
const searchYoutuberWithAPI = async (q) => {
    const res = await youtube.search.list({
        type: "channel",
        part: "id,snippet",
        fields: "items(id,snippet(publishedAt,channelId,title,description,thumbnails(default)))",
        maxResults: 10,
        q: q,
    });
    return res.data.items;
};
