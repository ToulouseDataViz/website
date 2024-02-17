import React from 'react';

import { Link } from 'gatsby';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IconContext } from 'react-icons';
import { FaMeetup, FaYoutube } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';

import { parseMarkdownToString, localiseDate } from '../utils/misc';
import usePics from '../hooks/usePics';
import Gallery from '../components/Gallery';
const useStyles = makeStyles(theme => ({
  meetup: {
    padding: theme.spacing(2),
    height: '630px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const renderLecturers = value => {
  if (value.length < 40) {
    return value;
  } else {
    const lecturerArray = value.split(';');
    const abbrevLecturerArrays = lecturerArray.map(lecturer => {
      const lecturerSpace = lecturer.indexOf(' ');
      const lecturerFirstName = lecturer.slice(0, lecturerSpace - 1);
      const lecturerLastName = lecturer.slice(lecturerSpace);
      return lecturerFirstName.slice(0, 1) + '. ' + lecturerLastName;
    });
    return abbrevLecturerArrays.join(';');
  }
};

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

  const expectedMeetupPics = usePics().filter(({ relativeDirectory, name }) => {
    return relativeDirectory === `meetup-pics/${meetupid}`;
  });
  const defaultMeetupPics = usePics().filter(({ relativeDirectory, name }) => {
    return relativeDirectory === `meetup-pics/0`;
  });

  const meetupPics = expectedMeetupPics.length > 0 ? expectedMeetupPics : defaultMeetupPics;

  const maxImageHeight = '150px';

  return (
    <Grid item xs={12} sm={6} md={4} className="event-grid">
      <Box className={`${classes.meetup} container-background`}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div>
            <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
              <h4>{title}</h4>
            </Link>
          </div>

          <div
            container
            direction={'column'}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            flexDirection={'column'}
            justify="space-between"
            alignItems="normal">
            <div
              style={{
                paddingBottom: '10px',
                fontSize: '0.9em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: '50%',
              }}>
              <div style={{ flex: '1' }}>{frenchDate}</div>
              <div style={{ flex: '1', textAlign: 'right' }}>
                {lecturers ? renderLecturers(lecturers) : 'Toulouse DataViz'}
              </div>
            </div>
            {meetupPics.length > 0 && (
              <Box style={{ height: maxImageHeight, marginBottom: '10px' }}>
                <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
                  <Gallery
                    style={{ height: maxImageHeight }}
                    picsToDisplay={meetupPics}
                    limit={1}
                    embedInBox={false}
                    maxHeight={maxImageHeight}
                    displayLightBoxOnClick={false}
                  />
                </Link>
              </Box>
            )}
            {descriptionRawString && (
              <div style={{ flex: '1', overflow: 'hidden', marginBottom: '10px' }}>
                <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
                  <div style={{ height: '160px', fontSize: '0.9em' }}>{description}</div>
                </Link>
              </div>
            )}

            {
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div
                  style={{
                    bottom: '40px',
                    position: 'absolute',
                    height: '60px',
                    width: '100%',
                    background: 'linear-gradient(rgba(26, 30, 45, 0.5),rgba(26, 30, 45, 1))',
                  }}></div>
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
            }
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default Event;
