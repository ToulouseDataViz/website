import React from 'react';

import EventMiniCard from './EventMiniCard';
import useEventsNotion from '../hooks/useEventsNotion';

import { pastEventStatusName } from '../settings';

const EventCurrent = ({
  includeStatus = [pastEventStatusName]
  
}) => {
  const events = useEventsNotion()
    .filter(({ status }) => includeStatus.includes(status))
    .sort((meetup1, meetup2) => meetup2.meetupid - meetup1.meetupid);

  if (events.length < 1) {
    return null;
  }

  return  <EventMiniCard {...events[0]} />;
};

export default EventCurrent;
