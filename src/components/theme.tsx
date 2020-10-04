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
    // colorscheme created by https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=616161&secondary.color=0277BD&secondary.text.color=E3F2FD&primary.text.color=ffffff
    primary: {
      main: '#424242',
      dark: '#1b1b1b',
      light: '#8e8e8e',
    },
    secondary: {
      main: '#0277bd',
      dark: '#004c8c',
      light: '#58a5f0',
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
