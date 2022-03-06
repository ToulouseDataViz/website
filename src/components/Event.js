import React from 'react';

import { Link } from 'gatsby';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IconContext } from 'react-icons';
import { FaMeetup, FaYoutube } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';

import { parseMarkdownToString, localiseDate } from '../helper';
import usePics from '../hooks/usePics';
import Gallery from '../components/Gallery';
const useStyles = makeStyles(theme => ({
  meetup: {
    padding: theme.spacing(2),
    height: '580px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Event = ({
  meetupid,
  title,
  date,
  videoLink,
  meetupLink,
  descriptionRawString,
  presLinks,
  vignetteLink,
  lecturers,
}) => {
  const classes = useStyles();
  const description = parseMarkdownToString(descriptionRawString);
  const frenchDate = localiseDate(date);
  const meetupPics = usePics().filter(({ relativeDirectory, name }) => {
    return relativeDirectory === `meetup-pics/${meetupid}`;
  });
  const maxImageHeight = '150px';
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box className={`${classes.meetup} container-background`}>
        <div style={{ minHeight: '100px', paddingBottom: '10px' }}>
          <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
            <h5>{title}</h5>
          </Link>
        </div>

        <div
          container
          direction="column"
          style={{ flex: 1 }}
          flexDirection="column"
          justify="space-between"
          alignItems="normal">
          <div
            style={{
              paddingBottom: '10px',
              fontSize: 'small',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <div style={{ flex: '1' }}>{frenchDate}</div>
            <div style={{ flex: '1', textAlign: 'right' }}>{lecturers ? lecturers : 'Toulouse DataViz'}</div>
          </div>
          {meetupPics.length > 0 && (
            <Box style={{ height: maxImageHeight, marginBottom: '10px' }}>
              <Gallery
                style={{ height: maxImageHeight }}
                picsToDisplay={meetupPics}
                limit={1}
                decorator={false}
                maxHeight={maxImageHeight}
              />
            </Box>
          )}
          {descriptionRawString && (
            <div style={{ height: '21vh', overflow: 'hidden' }}>
              <div style={{ height: '18vh', fontSize: '15px' }}>{description}</div>
              <div
                style={{
                  height: '40px',
                  width: '100%',
                  position: 'sticky',
                  background: 'linear-gradient(rgba(26, 30, 45, 0.5),rgba(26, 30, 45, 1))',
                }}></div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              {videoLink && (
                <a href={videoLink} target="_blank" rel="noreferrer" className="icon">
                  <FaYoutube />
                </a>
              )}
              {!videoLink && <div style={{ width: '26px' }}></div>}

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
              {!meetupLink && <div style={{ width: '26px' }}></div>}
            </IconContext.Provider>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default Event;
