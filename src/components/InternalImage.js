import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import usePics from '../hooks/usePics';
import { getPic } from '../helper';

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
    <GatsbyImage 
      image={image} 
      alt={altText} 
      class={classes.image} 
    />
  );
}

export default InternalImage;