import React, { useState } from 'react';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import Event from './Event';
import useEventsNotion from '../hooks/useEventsNotion';

import { pastEventStatusName } from '../settings';

const Events = ({
  includeStatus = [pastEventStatusName],
  
  wrapForPage = false,
  title = null,
  hideVideoFilter = false
}) => {
  const events = useEventsNotion()
    .filter(({ status }) => includeStatus.includes(status))
    .sort((meetup1, meetup2) => meetup2.meetupid - meetup1.meetupid);

  const [onlyVideo, setOnlyVideo] = useState(false);

  const displayEvents = onlyVideo ? events.filter(({ videoLink }) => videoLink) : events;

  const handleChange = event => {
    setOnlyVideo(event.target.checked);
  };

  if (events.length === 0) {
    return null;
  }

  const content = (
    <>
      {title && (
        <header className="major">
          <h2>{title} </h2>
        </header>
      )}

      {(!hideVideoFilter &&
        <Grid container alignItems="center">
          <FormControlLabel
            label={'Voir seulement les événements avec une vidéo'}
            control={<Switch checked={onlyVideo} onChange={handleChange} />}
          ></FormControlLabel>
        </Grid>
      )}

      <Grid container spacing={2}>
        {displayEvents.map(meetup => (
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
        <div className="inner">{content}</div>
      </section>
    );
  }

  return content;
};

export default Events;
