import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    width: '30vw',
    height: '30vw',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  wrap: {
    position: 'relative',
  },
  img: {
    position: 'absolute',
    top: '7.5vw',
    left: '13vw',
    width: '4vw',

  },
});

const YoutubeVideo = (props) => {
  const classes = useStyles();
  const { video } = props;
  return (
    <div className={classes.wrap}>
      <Link href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="video thumbnail"
              image={video.snippet.thumbnails.medium.url}
            />
            <CardContent>
              <Typography variant="h6">
                {video.snippet.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      <img src="/youtube_social_icon_red.png" className={classes.img} />
    </div>
  );
};

export default YoutubeVideo;
