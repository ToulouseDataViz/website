import React from 'react';

import { Grid, Box } from '@material-ui/core';

import useHackaviz from '../hooks/useHackaviz';
import useHackavizParticipants from '../hooks/useHackavizParticipants';

import YoutubeEmbed from '../components/YoutubeEmbed';
import Button from '../components/Button';
import HackavizSponsors from '../components/HackavizSponsors';
import HackavizResult from './HackavizResult';
import { getVideoEmbedId } from '../helper';

const Hackaviz = () => {

  const hackavizs = useHackaviz();
  const hackavizParticipants = useHackavizParticipants();
  const winnersColumn = {columnValue: 2, isDense: true};
  
  return (
    <section className="spotlights">
    {hackavizs.map(({ hackaviz, date, videoLink, description },index) => {
      const currentHackaviz = hackaviz;
      const videoEmbedId = getVideoEmbedId(videoLink);
      const winners = hackavizParticipants
        .filter(({ hackaviz, prix }) =>  hackaviz === currentHackaviz && prix);

      return (
        <section key={`hackaviz-section-${currentHackaviz}`}>
          <div className="inner">
            <Grid container spacing={2}>
              <Grid item xs>
                <h2>{`Hackaviz ${currentHackaviz}`}</h2>
                <Box>{date}</Box>
                <Button
                  link={`hackaviz/${currentHackaviz}-contest`}
                  type={'internal'}
                  text={"Voir le hackaviz"}
                />
                <hr/>
                <h3>{"Les données"}</h3>
                <Box>{description}</Box>
                <Button
                  link={`hackaviz/${currentHackaviz}-data`}
                  type={'internal'}
                  text={"Télécharger les données"}
                />
              </Grid>

              {videoLink && (
                <Grid item xs={6}>
                  <Button
                    link={videoLink}
                    text={"Revoir la remise des prix"}
                  />
                  <YoutubeEmbed
                    title={hackaviz}
                    embedId={videoEmbedId}
                  />
                </Grid>
              )}
            </Grid>

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
              link={`hackaviz/${currentHackaviz}-results`}
              type={'internal'}
              text={"Voir toutes les réalisations"}
            />

            <hr/>
            <h3>{"Les sponsors"}</h3>
            <HackavizSponsors
              currentHackaviz={currentHackaviz}
            />
          </div>
        </section>
      );
    })}
    </section>
  );
}
export default Hackaviz;
