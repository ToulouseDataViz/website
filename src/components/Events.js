import React, { useState } from 'react';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import Event from './Event';
import useEventsNotion from '../hooks/useEventsNotion';

import { pastEventStatusName } from '../settings';

const Events = ({
  includeStatus = [pastEventStatusName],
  displayVideoFilter = true,
  wrapForPage = false,
  title = null
}) => {
  const events = useEventsNotion()
    .filter(({ status }) => includeStatus.includes(status))
    .sort((meetup1, meetup2) => meetup2.meetupid - meetup1.meetupid);

  const [onlyVideo, setOnlyVideo] = useState(false);

  const diplayEvents = onlyVideo 
    ? events.filter(({ videoLink }) => videoLink)
    : events;

  const handleChange = (event) => {
    setOnlyVideo(event.target.checked);
  };

  if (events.length === 0) {
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
          <span>Filtrer pour voir les événements avec vidéos uniquement</span>
        </Grid>
      </Grid>
    )}

    <Grid container spacing={2} >
      {diplayEvents.map(meetup => (
        <React.Fragment key={meetup.meetupid}>      
          <Event {...meetup} />
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

export default Events;
