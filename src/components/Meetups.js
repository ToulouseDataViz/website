import React, { useState } from 'react';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import Meetup from './Meetup';
import useMeetups from '../hooks/useMeetups';

const Meetups = () => {
  const meetups = useMeetups();

  const [onlyVideo, setOnlyVideo] = useState(false);

  const diplayMeetups = onlyVideo 
    ? meetups.filter(({ videoLink }) => Boolean(videoLink))
    : meetups;

  const handleChange = (event) => {
    setOnlyVideo(event.target.checked);
  };

  return (
    <>
    <Grid container alignItems="center">
      <Grid item >
        <FormControlLabel
          control={
            <Switch 
              checked={onlyVideo} 
              onChange={handleChange} 
            />
          }
        />
      </Grid>
      <Grid item >
        <span>Filtrer pour voir les meetups avec vidéos uniquement</span>
      </Grid>
    </Grid>

    <Grid container spacing={2} >
      {diplayMeetups.map(({ meetupid, year, videoLink, title, place, month, meetupLink, day, descriptionHtml }) => (
        <React.Fragment key={meetupid}>      
          <Meetup
            meetupid={meetupid}
            title={title}
            place={place}
            day={day}
            month={month}
            year={year}
            videoLink={videoLink}
            meetupLink={meetupLink}
          />
        </React.Fragment>
      ))}
    </Grid>
    </>
  );
}

export default Meetups;
