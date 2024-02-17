import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Gallery from '../components/Gallery';
import Button from './Button';

import usePics from '../hooks/usePics';
import { getPicName } from '../utils/misc';

const useStyles = makeStyles({
  imageContainer: {
    textAlign: 'center',
  },
  noPadding: {
    paddingLeft: '0px !important',
    minHeight: '16em',
  },
  minHeightTitle: {
    minHeight: '3.4em',
  },
});

const ellide = (content, length) => {
  if (content.length > length) {
    return `${content.substring(0, length)}...`;
  } else {
    return content;
  }
};
const PressReview = ({ id, title, author, category, pic_name, year, url, comment }) => {
  const classes = useStyles();
  const description = `${ellide(comment, 400)}`;
  const gridSm = 6;

  const pics = usePics();
  const image = getPicName(pics, pic_name);

  return (
    <Grid item xs={12} sm={gridSm}>
      <Box class={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3 className={classes.minHeightTitle}>{title}</h3>
            <b>{author}</b> {`(${year})`}
          </Grid>
          <Grid item xs={4} className={classes.noPadding}>
            {pic_name && (
              <Box className={classes.imageContainer}>
                <Gallery
                  style={{ display: 'flex' }}
                  picsToDisplay={[image]}
                  limit={1}
                  embedInBox={false}
                  maxHeight={undefined}
                  displayLightBoxOnClick={true}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={8}>
            {description}
          </Grid>
          <Grid item xs={12}>
            {<Button link={url} type={'internal'} text={'Détails'} size={'small'} />}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default PressReview;
