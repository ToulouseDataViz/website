import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import clsx from 'clsx';

import usePics from '../hooks/usePics';

const useStyles = makeStyles(theme => ({
  galleryLarge: {
    margin: theme.spacing(2,0),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '1em',

    '& > :nth-child(6n + 3)': {
      gridColumn: 'span 1',
      gridRow: 'span 1',
    },
    '& > :nth-child(6n + 2)': {
      gridColumn: 'span 2',
      gridRow: 'span 2',
    },
    '& > :nth-child(6n + 5)': {
      gridColumn: 'span 2',
      gridRow: 'span 2',
    },
    '& > :nth-child(6n + 4)': {
      gridColumn: 'span 1',
      gridRow: 'span 1',
    }
  },
  gallerySmall:{
    margin: theme.spacing(1,0),
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridGap: '1em',
  },
  image: {
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 20px 0 rgba(0, 0, 0, 0.19)',

    '&:hover': {
      filter: 'blur(4px)',
      transition:' all ease 0.5s',
    },
  },
}));

const Gallery = ({ picsToDisplay = null, type = 'large', limit = null }) => {
  const classes = useStyles();
  const defaultMeetupPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'meetup-pics');

  let pics = picsToDisplay
    ? picsToDisplay
    : defaultMeetupPics;

  if (limit) {
    // get [limit] random element
    pics = defaultMeetupPics.sort(() => Math.random() - Math.random()).slice(0, limit)
  }
  
  return (
    <Box className={clsx({ 
      [classes.galleryLarge]: (type === 'large'), 
      [classes.gallerySmall]: type === 'small'}
    )}>
      {pics.map(({ id, gatsbyImageData },i) => (
        <GatsbyImage key={id} image={gatsbyImageData} className={classes.image}/>
      ))}
    </Box>
  );
}

export default Gallery;