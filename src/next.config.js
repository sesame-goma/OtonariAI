// 謎のエラー用
// module.exports = {
//   webpack: config => {
//     config.node = {
//       fs: 'empty',
//       child_process: 'empty',
//       net: 'empty',
//       dns: 'empty',
//       tls: 'empty',
//     };
//     return config;
//   },
// };

module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  distDir: '../.next',
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
};

