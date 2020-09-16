import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
