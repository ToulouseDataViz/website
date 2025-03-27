import React from 'react';

import { Grid } from '@material-ui/core';

import _hackavizParticipants from '../data/hackaviz_participants.json';
import HackavizResult from './HackavizResult';

const HackavizResults = ({ currentHackaviz }) => {
  const hackavizParticipants = _hackavizParticipants[currentHackaviz];

  const winnersColumn = { columnValue: 6 };
  const othersColumn = { columnValue: 4 };
  const winners = hackavizParticipants.filter(({ prix }) => prix);
  const others = hackavizParticipants.filter(({ prix }) => !prix);
  const hasWinners = winners.length > 0;
  const otherHeadline = hasWinners ? 'et toutes les autres contributions' : 'Les contributions';

  return (
    <>
      {hasWinners && (
        <>
          <h2>Les gagnantes et gagnants</h2>
          <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start">
            {winners.map(participant => {
              const mergedProps = { ...participant, ...winnersColumn };
              return <HackavizResult {...mergedProps} />;
            })}
          </Grid>
        </>
      )}

      <hr />
      <h2>{otherHeadline}</h2>
      <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start">
        {others.map(participant => {
          const mergedProps = { ...participant, ...othersColumn };
          return <HackavizResult {...mergedProps} />;
        })}
      </Grid>
    </>
  );
};

export default HackavizResults;
