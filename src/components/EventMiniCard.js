import React from 'react';

import { Link } from 'gatsby';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage } from 'gatsby-plugin-image';
import { localiseDate } from '../helper';
import usePics from '../hooks/usePics';
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

const showImage = false;

const EventMiniCard = ({ meetupid, title, date, lecturers }) => {
  const classes = useStyles();

  const frenchDate = localiseDate(date);

  const expectedMeetupPics = usePics().filter(({ relativeDirectory }) => {
    return relativeDirectory === `meetup-pics/${meetupid}`;
  });
  const defaultMeetupPics = usePics().filter(({ relativeDirectory }) => {
    return relativeDirectory === `meetup-pics/0`;
  });

  const meetupPics = expectedMeetupPics.length > 0 ? expectedMeetupPics : defaultMeetupPics;

  return (
    <Box className={`${classes.meetup} container-background`} style={{ padding: '6px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' , justifyContent: "space-between"}}>
        <div>
          <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
            <h4 style={{ margin: '0 0 0 0' }}>{title}</h4>
          </Link>
        </div>

        <div
          container
          direction={'row'}
          style={{ flex: "0 1 %", display: 'flex', flexDirection: 'row' }}
          flexDirection={'row'}
          justify="space-between"
          
          alignItems="normal">
          <div
            style={{
              paddingBottom: '10px',
              fontSize: '0.9em',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '50%',
            }}>
            <div >{frenchDate}</div>
            <div >{lecturers ? renderLecturers(lecturers) : 'Toulouse DataViz'}</div>
          </div>
          {showImage && meetupPics.length > 0 && (
            <Link to={`/event/${meetupid}`} style={{ borderBottom: 'none' }}>
              {<GatsbyImage
              className='ImageMiniEvent'
                image={meetupPics[0].gatsbyImageData}
                style={{ width: "90%" }}
            />}
            </Link>
          )}
        </div>
      </div>
    </Box>
  );
};

export default EventMiniCard;
