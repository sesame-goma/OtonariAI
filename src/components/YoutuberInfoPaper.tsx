import {
  Typography,
  ListItem,
  Paper,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

const YoutuberInfoPaper = ({channels}) => (
  <Paper>
    {channels && (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="square" alt="channel" src={channels.thumbnail} />
        </ListItemAvatar>
        <ListItemText
          primary={channels.title}
          // secondary={
          //   <React.Fragment>
          //     <Typography
          //       component="span"
          //       variant="body2"
          //       color="textSecondary"
          //       style={{display: 'block'}}
          //     >
          //       {`チャンネル登録者数 ${parseInt(
          //         channels.subscriberCount
          //       ).toLocaleString()} 人`}
          //     </Typography>
          //     <Typography
          //       component="span"
          //       variant="body2"
          //       style={{display: 'block'}}
          //       color="textSecondary"
          //     >
          //       {`総視聴回数 ${parseInt(
          //         channels.viewCount
          //       ).toLocaleString()} 回`}
          //     </Typography>
          //   </React.Fragment>
          // }
        />
      </ListItem>
    </List>
    )}
  </Paper>
)

export default YoutuberInfoPaper;