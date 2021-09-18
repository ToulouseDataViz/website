import React from 'react';

import { Grid, Box } from '@material-ui/core';

import useHackaviz from '../hooks/useHackaviz';
import useHackavizParticipants from '../hooks/useHackavizParticipants';

import YoutubeEmbed from '../components/YoutubeEmbed';
import Button from '../components/Button';
import HackavizSponsors from '../components/HackavizSponsors';
import HackavizResult from './HackavizResult';
import { getVideoEmbedId } from '../helper';
import { pastEventStatusName } from '../settings';

const Hackaviz = () => {

  const hackavizs = useHackaviz();
  const hackavizParticipants = useHackavizParticipants();
  const winnersColumn = {columnValue: 2, isDense: true};
  
  return (
    <section className="spotlights">
    {hackavizs.map(({ hackaviz, status, date, videoLink, description }) => {
      const currentHackaviz = hackaviz;
      const videoEmbedId = getVideoEmbedId(videoLink);
      const winners = hackavizParticipants
        .filter(({ hackaviz, prix }) =>  hackaviz === currentHackaviz && prix);
      const hasWinners = winners.length !== 0;
      const isPastHackaviz = status === pastEventStatusName;

      return (
        <section key={`hackaviz-section-${currentHackaviz}`}>
          <div className="inner">
            <Grid container spacing={2}>
              <Grid item xs>
                <h2>{`Hackaviz ${currentHackaviz}`}</h2>
                <Box><b>{date}</b></Box>
                <Box>{description}</Box>
                <Button
                  link={`${currentHackaviz}-contest`}
                  type={'internal'}
                  text={"Voir le hackaviz"}
                />

                
              </Grid>

              {videoLink && (
                <Grid item xs={6}>
                  <YoutubeEmbed
                    title={hackaviz}
                    embedId={videoEmbedId}
                  />
                </Grid>
              )}
            </Grid>

            {isPastHackaviz && hasWinners && (
              <>
                <hr/>
                <h3>{"Les gagnants"}</h3>
                <Grid 
                  container 
                  spacing={2}
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  {winners.map(participant => {
                    const mergedProps = {...participant, ...winnersColumn};
                    return (
                      <HackavizResult {...mergedProps} />
                    );
                  })}
                </Grid>
    
                <Button
                  link={`${currentHackaviz}-results`}
                  type={'internal'}
                  text={"Voir toutes les réalisations"}
                />
              </>
            )}

            <hr/>
           
          </div>
        </section>
      );
    })}
    </section>
  );
}
export default Hackaviz;
