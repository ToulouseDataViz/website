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
}));

const Sponsors = () => {
  const classes = useStyles();

  const sponsors = useSponsors();
  const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');
  const getPic = myName => sponsorsPics.find(({ name }) => myName === name)?.gatsbyImageData;

  return (
    <Grid container spacing={2}>
      {sponsors.map(({ name, type, pic_name, link, children }) => {
        const sponsorPic = getPic(pic_name);
        const markdownDescription = children[0]?.childMarkdownRemark?.htmlAst;
        debugger
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
  );
};

export default Sponsors;
