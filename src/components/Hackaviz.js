import React from 'react';

import { Grid, Box } from '@material-ui/core';

import useHackaviz from '../hooks/useHackaviz';
import useHackavizParticipants from '../hooks/useHackavizParticipants';

import YoutubeEmbed from '../components/YoutubeEmbed';
import Button from '../components/Button';
import HackavizSponsors from '../components/HackavizSponsors';
import { getVideoEmbedId } from '../helper';

const Hackaviz = () => {

  const hackavizs = useHackaviz();
  const hackavizParticipants = useHackavizParticipants();
  
  return (
    <>
    {hackavizs.map(({ hackaviz, date, videoLink, description }) => {
      const currentHackaviz = hackaviz;
      const videoEmbedId = getVideoEmbedId(videoLink);
      const winners = hackavizParticipants
        .filter(({ hackaviz, prix }) =>  hackaviz === currentHackaviz && prix);

      return (
        <Box>
          <Grid container spacing={2}>
          <Grid item xs>
            <h2>{`Hackaviz ${hackaviz}`}</h2>
            <Box>{date}</Box>
            <Button
              link={"hackaviz/2020-contest"}
              type={'internal'}
              text={"Voir le hackaviz"}
            />
            <h3>{"Les données"}</h3>
            <Button
              link={"hackaviz/2020-data"}
              type={'internal'}
              text={"Télécharger les données"}
            />
            <Box>{description}</Box>
            <h3>{"En chiffres"}</h3>
            <h3>{"Les gagnants"}</h3>
            <Box>
              <ul>
              {winners.map(({ nom, prix }) => (
                <li>
                  <span><b>{prix}</b>{`: ${nom}`}</span>
                </li>
              ))}
              </ul>
            </Box>
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

          <h3>{"Les sponsors"}</h3>
          <HackavizSponsors
            currentHackaviz={currentHackaviz}
          />
        </Box>
      );
    })}
    </>
  );
}
export default Hackaviz;
