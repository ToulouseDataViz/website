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
    padding: 0,
    minHeight: '4em'
  },
  imageContainer: {
    width: '5.5em',
    
  },
  gatsbyImageCentered: {
    verticalAlign: 'middle',
  },
}));

const AssoSponsors = () => {
  const classes = useStyles();
  const assoSponsors = useSponsors().filter(({ inactive }) => !inactive).sort((a,b)=>a.rank-b.rank);
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
          <a href={`sponsor/${pic_name}`} target="_blank" rel="noreferrer">
            <Grid item className={classes.imageContainer} >
              <GatsbyImage image={sponsorPic} alt={pic_name} className={classes.imageContainer} />
            </Grid>
          </a>
        );
      })}
    </Grid>
  );
};

export default AssoSponsors;
