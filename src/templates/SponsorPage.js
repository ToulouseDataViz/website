import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Helmet from 'react-helmet';
import Layout from '../components/layout';

import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

import useSponsors from '../hooks/useSponsors';
import usePics from '../hooks/usePics';
import MarkdownText from '../components/MarkdownText';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    maxWidth: 150,
    height: 80,
    padding: theme.spacing(2),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  gatsbyImageCentered: {
    verticalAlign: 'middle',
  },

  paddingTop: { paddingTop: '20px' },

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

const SponsorPage = ({
  data: sponsor
}) => {
  const classes = useStyles();

  const sponsors = useSponsors().filter(({ inactive }) => !inactive).sort((a, b) => a.rank - b.rank);
  const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');
  const getPic = myName => sponsorsPics.find(({ name }) => myName === name)?.gatsbyImageData;


  console.log("SPONSOR")
  console.log(sponsor)
  return (
    <Layout>
      <Helmet>
        <title>{sponsor}</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>Le sponsor</h1>
              {sponsor}
              <Grid container spacing={2}>
                {sponsors.map(({ name, type, pic_name, link, children }) => {
                  const sponsorPic = getPic(pic_name);
                  const markdownDescription = children[0]?.childMarkdownRemark?.htmlAst;
                  return (
                    <React.Fragment key={name}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column" justify="space-evenly" alignItems="center">
                          <Box class={classes.content}>
                            <Grid item>
                              {sponsorPic && (
                                <Box className={classes.imageContainer}>
                                  <a href={link} target="_blank" rel="noreferrer">
                                    <GatsbyImage className={classes.gatsbyImageCentered} image={sponsorPic} alt={pic_name} />
                                  </a>
                                </Box>
                              )}
                            </Grid>
                            {markdownDescription && (
                              <Grid item className={classes.paddingTop}>
                                <MarkdownText hast={markdownDescription} />
                              </Grid>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </header>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SponsorPage;
