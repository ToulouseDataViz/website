import React from 'react';

import { Grid, Box } from '@material-ui/core';

import useHackaviz from '../hooks/useHackaviz';
import useHackavizParticipants from '../hooks/useHackavizParticipants';

import YoutubeEmbed from '../components/YoutubeEmbed';
import Button from '../components/Button';
import HackavizResult from './HackavizResult';
import { getVideoEmbedId } from '../helper';
import { pastEventStatusName } from '../settings';

const Hackaviz = () => {
  const hackavizs = useHackaviz().filter(item => item.status === pastEventStatusName);
  const hackavizParticipants = useHackavizParticipants();
  const winnersColumn = { columnValue: 2, isDense: true };

  return (
    <section className="spotlights">
      {hackavizs.map(({ hackaviz, status, date, videoLink, description }) => {
        const currentHackaviz = hackaviz;
        const videoEmbedId = getVideoEmbedId(videoLink);
        const winners = hackavizParticipants.filter(({ hackaviz, prix }) => hackaviz === currentHackaviz && prix);
        const hasWinners = winners.length !== 0;

        return (
          <section key={`hackaviz-section-${currentHackaviz}`}>
            <div className="inner">
              <Grid container spacing={2}>
                <Grid item xs>
                  <h2>{`Hackaviz ${currentHackaviz}`}</h2>
                  <Box>
                    <b>{date}</b>
                  </Box>
                  <Box>{description}</Box>
                  <Button link={`/hackaviz/${currentHackaviz}-contest`} type={'internal'} text={'Voir le hackaviz'} />
                </Grid>

                {videoLink && (
                  <Grid item xs={6}>
                    <YoutubeEmbed title={hackaviz} embedId={videoEmbedId} />
                  </Grid>
                )}
              </Grid>

              {hasWinners && (
                <>
                  <hr />
                  <h3>{'Les gagnants'}</h3>
                  <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start">
                    {winners.map(participant => {
                      const mergedProps = { ...participant, ...winnersColumn };
                      return <HackavizResult {...mergedProps} />;
                    })}
                  </Grid>

                  <Button
                    link={`/hackaviz/${currentHackaviz}-results`}
                    type={'internal'}
                    text={'Voir toutes les réalisations'}
                  />
                </>
              )}

              <hr />
            </div>
          </section>
        );
      })}
    </section>
  );
};
export default Hackaviz;
