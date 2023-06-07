import React, { useEffect, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import clsx from 'clsx';

import usePics from '../hooks/usePics';

import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
  galleryLarge: {
    margin: theme.spacing(2, 0),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '1em',
    textAlign: 'center',

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
    },
  },
  gallerySmall: {
    margin: theme.spacing(1, 0),
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridGap: '1em',
    textAlign: 'center',
  },

  imageHover: {
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 20px 0 rgba(0, 0, 0, 0.19)',

    '&:hover': {
      cursor: 'zoom-in',
    },
  },
}));

const Gallery = ({
  /** list of pictures */
  picsToDisplay = null,
  /** small/large */
  type = 'large',
  /** max number of images to display */
  limit = null,
  /** put image in a box container */
  embedInBox = true,
  maxHeight = '200px',
  /**
   * show image in a light box widget on click
   * see https://github.com/theanam/react-awesome-lightbox#readme
   */
  displayLightBoxOnClick = true,
}) => {
  const classes = useStyles();
  const defaultMeetupPics = usePics().filter(({ relativeDirectory }) => relativeDirectory.startsWith('meetup-pics'));
  const refreshPeriodInSeconds = 10000;

  const [pics, setPics] = useState([]);
  const [displayLightBox, setDisplayLightBox] = useState(undefined);

  const getPics = () => {
    let pics = picsToDisplay ? picsToDisplay : defaultMeetupPics;

    if (limit) {
      // get [limit] random element
      pics = pics.sort(() => Math.random() - Math.random()).slice(0, limit);
    }
    setPics(pics); // set State
  };

  useEffect(() => {
    getPics();
    const interval = setInterval(() => {
      getPics();
    }, refreshPeriodInSeconds);

    return () => clearInterval(interval);
  }, [limit]);
  /*
   effect will only be trigged only once (on mount and unmount)
   https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  */
  if (!displayLightBox) {
    if (embedInBox) {
      return (
        <Box
          className={clsx({
            [classes.galleryLarge]: type === 'large',
            [classes.gallerySmall]: type === 'small',
          })}>
          {pics.map(({ id, gatsbyImageData }) => {
            return (
              <GatsbyImage
                key={id}
                className={classes.imageHover}
                image={gatsbyImageData}
                onClick={() => {
                  displayLightBoxOnClick && setDisplayLightBox(gatsbyImageData.images.fallback.src);
                }}
              />
            );
          })}
        </Box>
      );
    } else {
      return pics.map(({ id, gatsbyImageData }) => {
        return (
          <GatsbyImage
            key={id}
            image={gatsbyImageData}
            style={{ height: maxHeight }}
            imgStyle={{ height: maxHeight }}
            objectFit="contain"
            onClick={() => {
              displayLightBoxOnClick && setDisplayLightBox(gatsbyImageData.images.fallback.src);
            }}
          />
        );
      });
    }
  } else {
    return (
      <Lightbox
        image={displayLightBox}
        title={'Image Title'}
        showTitle={false}
        allowRotate={false}
        onClose={() => {
          setDisplayLightBox(undefined);
        }}></Lightbox>
    );
  }
};

export default Gallery;
