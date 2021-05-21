import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useHackavizSponsors from '../hooks/useHackavizSponsors';
import usePics from '../hooks/usePics';

import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    maxWidth: 150,
    backgroundColor: 'white',
  },
}));

const HackavizSponsors = ({ currentHackaviz }) => {
  const classes = useStyles();
  const hackavizSponsors = useHackavizSponsors().filter(({ hackaviz }) => hackaviz === currentHackaviz);
  const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');

  return (
    <Grid 
      container 
      spacing={2}
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      {hackavizSponsors.map(({ sponsor_pic }) => {
        const sponsorPic = getPic(sponsorsPics, sponsor_pic);
        return (
          <Grid item className={classes.imageContainer}>
            <GatsbyImage className={classes.image} image={sponsorPic} alt={sponsor_pic}/>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default HackavizSponsors