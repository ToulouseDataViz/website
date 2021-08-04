import React, { useState } from 'react';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import Meetup from './Meetup';
import useMeetupsNotion from '../hooks/useMeetupsNotion';

import { pastMeetupStatusName } from '../settings';

const Meetups = ({
  includeStatus = [pastMeetupStatusName],
  displayVideoFilter = true,
  wrapForPage = false,
  title = null
}) => {
  const meetups = useMeetupsNotion()
    .filter(({ status }) => includeStatus.includes(status))
    .sort((meetup1, meetup2) => meetup2.meetupid - meetup1.meetupid);

  const [onlyVideo, setOnlyVideo] = useState(false);

  const diplayMeetups = onlyVideo 
    ? meetups.filter(({ videoLink }) => Boolean(videoLink))
    : meetups;

  const handleChange = (event) => {
    setOnlyVideo(event.target.checked);
  };

  if (meetups.length === 0) {
    return null;
  }

  const content = (
    <>
    {title && (
      <header className="major">
        <h2>{ title } </h2>
      </header>
    )}
    
    {displayVideoFilter && (
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
    )}

    <Grid container spacing={2} >
      {diplayMeetups.map(meetup => (
        <React.Fragment key={meetup.meetupid}>      
          <Meetup {...meetup} />
        </React.Fragment>
      ))}
    </Grid>
    </>
  );

  if (wrapForPage) {
    return (
      <section id="one">
          <div className="inner">
            { content }
          </div>   
        </section> 
    )
  }

  return content;
}

export default Meetups;
