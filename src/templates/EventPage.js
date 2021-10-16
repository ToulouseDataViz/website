import React from 'react';
import { graphql } from 'gatsby';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helmet from 'react-helmet'
import Layout from '../components/layout'
import YoutubeEmbed from '../components/YoutubeEmbed';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import MarkdownText from '../components/MarkdownText';
import PrevNextPage from '../components/PrevNextPage';

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
  data: { meetup: { properties: { meetupid: { number: value } } }}
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
    return relativeDirectory.startsWith(`meetup-pics/${currentMeetupid}`);
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

            {meetupPics.length > 0 && (
              <Box className={classes.griditemmargin}>
                <Gallery picsToDisplay={meetupPics}/>
              </Box>
            )}

            <PrevNextPage
              currentItemId={currentMeetupid}
              lastItemId={lastMeetupId}
              itemName={'Évènement'}
              itemPath={'event'}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EventPage;

export const pageQuery = graphql`
  query MyQuery($id: String) {
    meetup: notionPage(id: { eq: $id }) {
      properties {
        meetupid {
          number
        }
      }
    }
  }
`;
