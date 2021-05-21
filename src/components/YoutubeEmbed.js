import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  responsiveVideo: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
    margin: theme.spacing(2,0),

    '& > iframe': {
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
}));

const YoutubeEmbed = ({ title, embedId }) => {
  const classes = useStyles();

  return (
    <div className={classes.responsiveVideo}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        title={title}
      />
    </div>
  );
}

export default YoutubeEmbed;