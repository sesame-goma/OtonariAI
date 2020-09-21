import {
  Button,
  Typography,
  ListItem,
  Paper,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  inline: {
    display: "inline",
  },
  button: {
    marginTop: 5,
  },
}));

const YoutuberInfoPaper = ({ channel, handleApply, isVisibleButton }) => {
  const classes = useStyles();
  return (
    <Paper>
      {channel && (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={channel.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={channel.title}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {channel.description}
                <ListItem disableGutters className={classes.button}>
                  {isVisibleButton && (
                    <Button variant="contained" color="secondary" onClick={handleApply}>
                      食レポを申し込む
                    </Button>
                  )}
                </ListItem>
                </Typography>
              }
            />
          </ListItem>
        </>
      )}

    </Paper>
  );
}


export default YoutuberInfoPaper;
