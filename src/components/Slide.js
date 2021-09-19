import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InternalImage from './InternalImage';
import Button from './Button';

const useStyles = makeStyles({
  imageContainer: {
    textAlign: 'center',
    '&:hover': {
      transform: 'scale(1.5)',
      transition:' all ease 1s',
      zIndex: '42'    
    }
  },
  noPadding: {
    paddingLeft: '0px !important',
    minHeight: '16em',
    
  },
  minHeightTitle: {
    minHeight: '3.4em'
  }


  
});

const ellide = (content, length) => {
  if (content.length>length) {
    return `${content.substring(0, length)}...`; 
  } else {
    return content;
  }
}
const Slide = ({ id, title, author, category, pic_name, year, url, comment  }) => {
  const classes = useStyles();
  const slideDescription = `${ellide(comment,400)}`;
  const gridSm = 6;

  return (
    <Grid item xs={12} sm={gridSm}>
      <Box class={classes.content}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <h3 className={classes.minHeightTitle}>{ title }</h3>
            <b>{ author }</b> { `(${year})` }
          </Grid>
          <Grid item xs={4} className={classes.noPadding} >
            {pic_name && (
              <Box className={classes.imageContainer}>
                <InternalImage
                  
                  name={pic_name}
                  altText={""}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={8}>
            {slideDescription}
          </Grid>
          <Grid item xs={12}>
          {(
            <Button
              link={url}
              type={'internal'}
              text={"Plus de détails"}
              size={"small"}
            />
          )}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );

}

export default Slide;