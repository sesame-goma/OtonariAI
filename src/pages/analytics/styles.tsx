import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    // スクロール禁止のため
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
  },
  bottomAdjuster: {
    marginBottom: theme.spacing(5),
  },
  gridTile: {
    marginBottom: theme.spacing(3),
  },
  gridBox: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTileBar: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(25, 118, 210, 0.4)',
    borderRadius: 5,
    // backgroundColor: 'rgba(244, 244, 244, 0.8)',
  },
  aws: {
    marginTop: 30,
    width: 220,
    height: 'auto',
  },
  firebase: {
    width: 'auto',
    height: 190,
  },
  skillIcon: {
    fontSize: theme.spacing(23),
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
}));