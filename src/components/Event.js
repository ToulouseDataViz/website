import React from 'react';

import { Link } from 'gatsby';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IconContext } from 'react-icons';
import { FaMeetup, FaYoutube } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';

import { parseMarkdownToString } from '../helper';

const useStyles = makeStyles(theme => ({
  meetup: {
    padding: theme.spacing(2),
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Event = ({
  meetupid,
  title,
  place,
  date,
  videoLink,
  meetupLink,
  descriptionRawString,
  presLinks,
  vignetteLink,
}) => {
  const classes = useStyles();
  const description = parseMarkdownToString(descriptionRawString);
  const dateConvert = new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10));
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  console.log(presLinks);
  return (
    <Grid item xs={12} sm={4}>
      <Box className={`${classes.meetup} container-background`}>
        <div style={{ height: '110px', paddingBottom: '10px' }}>
          <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
            <h4>{title}</h4>
          </Link>
        </div>

        <Grid
          container
          direction="column"
          style={{ flex: 1 }}
          flexDirection="column"
          justify="space-between"
          alignItems="normal"
        >
          <IconContext.Provider value={{ size: '1.5em' }}>
            <span style={{ paddingBottom: '10px' }}>{dateConvert.toLocaleDateString('FR-fr', options)}</span>
            {descriptionRawString && <p style={{ flex: 1 }}>{`${description.substring(0, 190)}...`}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {videoLink && (
                <a href={videoLink} target="_blank" rel="noreferrer" className="icon">
                  <FaYoutube />
                </a>
              )}
              {presLinks &&
                presLinks.map(presLink => {
                  if (presLink) {
                    return (
                      <a href={presLink.url} target="_blank" rel="noreferrer" className="icon">
                        <CgFileDocument />
                      </a>
                    );
                  } else {
                    return <></>;
                  }
                })}
              {meetupLink && (
                <a href={meetupLink} target="_blank" rel="noreferrer" className="icon">
                  <FaMeetup />
                </a>
              )}
            </div>
          </IconContext.Provider>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Event;
