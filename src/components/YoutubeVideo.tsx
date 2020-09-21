import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const YoutubeVideo = (props) => {
  const classes = useStyles();
  const { video } = props;
  console.log(video);
  return (
    <Link href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
      <a target="_blank">
        <Card className={classes.root} style={{ padding: 20 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="video thumbnail"
              height="320"
              width="180"
              image={video.snippet.thumbnails.medium.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {video.snippet.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default YoutubeVideo;
