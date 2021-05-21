import React from 'react';

import { Link } from "gatsby"
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  meetup: {
    backgroundColor: '#2e3450',
    padding: theme.spacing(2),
  },
}));

const Meetup = ({ meetupid, title, place, day, month, year, videoLink, meetupLink }) => { 
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} >
      <Box className={classes.meetup}>
        <Link to={`/meetup/${meetupid}`}>
          <h4>{title}</h4>
        </Link>
        <span>{place}</span>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <span>{`${day} ${month} ${year}`}</span>
          { videoLink && (
            <a href={videoLink} target="_blank" rel="noreferrer" className="icon alt fa-youtube"><span className="label">Youtube</span></a>
          )}
          { meetupLink && (
            <a href={meetupLink} target="_blank" rel="noreferrer" className="icon alt fa-meetup"><span className="label">Youtube</span></a>
          )}
        </Grid>
      </Box>
    </Grid>
  );
}

export default Meetup;