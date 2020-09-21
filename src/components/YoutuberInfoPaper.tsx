import {
  Button,
  Typography,
  ListItem,
  Paper,
  List,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: 16,
  },
}));

const YoutuberInfoPaper = ({ channel, handleApply }) => {
  const classes = useStyles();
  return (
    <Paper>
      {channel && (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar variant="square" alt="channel" src={channel.thumbnail} />
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
                </Typography>
              }
            />
          </ListItem>
          <ListItemSecondaryAction classes={classes.button}>
            <Button variant="contained" color="secondary" onClick={handleApply}>
              食レポを申し込む
            </Button>
          </ListItemSecondaryAction>
        </List>
      )}
    </Paper>
  );
}

export default YoutuberInfoPaper;