import React from 'react';

import { Link } from "gatsby"
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IconContext } from "react-icons";
import { FaMeetup, FaYoutube } from 'react-icons/fa';

import { parseMarkdownToString } from '../helper';

const useStyles = makeStyles(theme => ({
  meetup: {
    padding: theme.spacing(2),
  },
}));

const Event = ({ meetupid, title, place, date, videoLink, meetupLink, descriptionRawString }) => { 
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} >
      <Box className={`${classes.meetup} container-background`}>
        <Link to={`/event/${meetupid}`}>
          <h4>{title}</h4>
        </Link>
        <span>{place}</span>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <span>{date}</span>
            {descriptionRawString && (
                <p>{ `${parseMarkdownToString(descriptionRawString).substring(0, 200)}...` }</p>
              )}
            { videoLink && (
              <a href={videoLink} target="_blank" rel="noreferrer" className="icon">
                <FaYoutube />
              </a>
            )}
            { meetupLink && (
              <a href={meetupLink} target="_blank" rel="noreferrer" className="icon">
                <FaMeetup />
              </a>
            )}
          </IconContext.Provider>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Event;