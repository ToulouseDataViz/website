import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Grid } from '@material-ui/core';

import usePics from '../hooks/usePics';
import { getPic } from '../utils/misc';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image: {
    margin: theme.spacing(1),
  },
}));

const InternalImage = ({ name, altText }) => {
  const classes = useStyles();

  const pics = usePics();
  const image = getPic(pics, name);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <GatsbyImage image={image} alt={altText} class={classes.image} />
    </Grid>
  );
};

export default InternalImage;
