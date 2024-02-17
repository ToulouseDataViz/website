import React from 'react';
import { graphql } from 'gatsby';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helmet from 'react-helmet';
import Layout from '../components/layout';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Gallery from '../components/Gallery';
import MarkdownText from '../components/MarkdownText';
import PrevNextPage from '../components/PrevNextPage';

import useEventsNotion from '../hooks/useEventsNotion';
import usePics from '../hooks/usePics';
import { getVideoEmbedId, localiseDate } from '../utils/misc';
import { pastEventStatusName } from '../settings';
import { CgFileDocument } from 'react-icons/cg';

const useStyles = makeStyles(theme => ({
  meetupnavitem: {
    margin: theme.spacing(1, 0),
  },
  description: {
    margin: theme.spacing(3, 0),
  },
  griditemmargin: {
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

const EventPage = ({
  data: {
    meetup: {
      properties: {
        meetupid: { number: value },
      },
    },
  },
}) => {
  const classes = useStyles();

  const currentMeetupid = value;
  const events = useEventsNotion();
  const { title, place, date, meetupLink, videoLink, descriptionHtmlAst, presLinks, lecturers } = events.find(
    ({ meetupid }) => meetupid === currentMeetupid
  );

  const lastMeetupId = Math.max(
    ...events.filter(({ status }) => status === pastEventStatusName).map(({ meetupid }) => meetupid)
  );

  const meetupPics = usePics().filter(({ relativeDirectory, name }) => {
    return relativeDirectory === `meetup-pics/${currentMeetupid}`;
  });

  const frenchDate = localiseDate(date);

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
            <Grid container>
              {meetupLink && (
                <Box className={classes.griditemmargin}>
                  <a href={meetupLink} className="icon alt fa-meetup">
                    <span className="label">Meetup</span>
                  </a>
                </Box>
              )}
            </Grid>
            <h1>{title}</h1>
            <Box className={classes.griditemmargin}>
              <ul>
                <li>
                  Date&nbsp;
                  <b>{frenchDate}</b>
                </li>
                {place && (
                  <li>
                    Lieu&nbsp;<b>{place}</b>
                  </li>
                )}
                <li>
                  Présentateurs&nbsp;
                  <b>{lecturers ? lecturers : 'Toulouse DataViz'}</b>
                </li>
              </ul>
            </Box>
            {descriptionHtmlAst && <MarkdownText hast={descriptionHtmlAst} />}
            {presLinks && presLinks.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ul>
                  <li>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px' }}>
                      Présentations : &nbsp;
                      {presLinks.map(presLink => {
                        if (presLink) {
                          return (
                            <div>
                              <a href={presLink.url} target="_blank" rel="noreferrer" className="icon">
                                <CgFileDocument size={'48px'} />
                              </a>
                            </div>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {videoLink && (
              <div>
                <YoutubeEmbed title={title} embedId={getVideoEmbedId(videoLink)} />
              </div>
            )}

            {meetupPics.length > 0 && (
              <Box className={classes.griditemmargin}>
                <Gallery picsToDisplay={meetupPics} />
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
  );
};

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
