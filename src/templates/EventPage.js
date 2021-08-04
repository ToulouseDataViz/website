import React from 'react';
import { graphql } from 'gatsby';

import clsx from 'clsx';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helmet from 'react-helmet'
import Layout from '../components/layout'
import YoutubeEmbed from '../components/YoutubeEmbed';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import MarkdownText from '../components/MarkdownText'

import useEventsNotion from '../hooks/useEventsNotion';
import usePics from '../hooks/usePics';
import { getVideoEmbedId } from '../helper';
import { pastEventStatusName } from '../settings';

const useStyles = makeStyles(theme => ({
  meetupnavitem: {
    margin: theme.spacing(1,0),
  },
  description: {
    margin: theme.spacing(3,0),
  },
  griditemmargin: {
    margin: theme.spacing(0,2,0,0),
  }
}));

const EventPage = ({ 
  data: { meetup: { properties: { meetupid: { value } } }}
}) => {
  const classes = useStyles();

  const currentMeetupid = value;
  const events = useEventsNotion();
  const { title, date, meetupLink, videoLink, descriptionHtmlAst } = events
    .find(({ meetupid }) => meetupid === currentMeetupid);

  const lastMeetupId = Math.max(...events
    .filter(({ status }) => status === pastEventStatusName)
    .map(({ meetupid }) => meetupid)
  );

  const meetupPics = usePics().filter(({ relativeDirectory, name }) => {
    return relativeDirectory === 'meetup-pics' && name.match(/(\d*)_.*/)[1] === currentMeetupid
  });

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>Les évènements</h1>
            </header>
            <Grid container >
              {meetupLink && (
                <Box className={classes.griditemmargin}>
                  <a href={meetupLink} className="icon alt fa-meetup"><span className="label">Meetup</span></a>
                </Box>
              )}
              <Box className={classes.griditemmargin}>
                <span>{date}</span>
              </Box>
            </Grid>
            <h1>{title}</h1>
            
            {descriptionHtmlAst && (
              <MarkdownText
                hast={descriptionHtmlAst}
              />
            )}

            {meetupPics.length > 0 && (
              <Gallery picsToDisplay={meetupPics} />
            )}
            {videoLink && (
              <div>
                <Button
                  link={videoLink}
                  text={'Revoir le meetup'}
                />
                <YoutubeEmbed
                  title={title}
                  embedId={getVideoEmbedId(videoLink)}
                />
              </div>
            )}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {(currentMeetupid > 1) && (
                <a 
                  href={`/event/${currentMeetupid - 1}`} 
                  className={clsx(classes.meetupnavitem,"button", "medium")}
                >
                  Évènement précédent
                </a>
              )}
              {(currentMeetupid < lastMeetupId) && (
                <a href={`/event/${currentMeetupid + 1}`} className="button medium">Évènement suivant</a>
              )}
            </Grid>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EventPage;

export const pageQuery = graphql`
  query MyQuery($id: String) {
    meetup: notion(id: { eq: $id }) {
      properties {
        meetupid {
          value
        }
      }
    }
  }
`;
