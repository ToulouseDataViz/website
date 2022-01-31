import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useSponsors from '../hooks/useSponsors';
import usePics from '../hooks/usePics';

import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  imageGridContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(1, 0),
  },
  imageContainer: {
    maxWidth: '150px',
  },
  gatsbyImageCentered: {
    verticalAlign: 'middle',
  },
}));

const AssoSponsors = () => {
  const classes = useStyles();
  const assoSponsors = useSponsors();
  const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classes.imageGridContainer}
    >
      {assoSponsors.map(({ pic_name }) => {
        const sponsorPic = getPic(sponsorsPics, pic_name);
        return (
          <a href={'sponsors'} target="_blank" rel="noreferrer">
            <Grid item className={classes.imageContainer}>
              <GatsbyImage image={sponsorPic} alt={pic_name} className={classes.imageContainer} />
              {/* <img src={sponsorPic.images.fallback.src} alt={pic_name} className={classes.imageContainer} /> */}
            </Grid>
          </a>
        );
      })}
    </Grid>
  );
};

export default AssoSponsors;
