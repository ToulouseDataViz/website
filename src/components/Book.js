import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import usePics from '../hooks/usePics';

import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  content: {

  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    border: '4px solid #242943',
  }
}));

const Book = ({ title, author, category, pic_name, year, comment }) => {
  const classes = useStyles();
  const booksPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'books-pics');
  const bookPic = getPic(booksPics, pic_name);

  return (
    <Grid item xs={12} sm={6}>
      <Box class={classes.content}>
        <Grid container spacing={2}
        >
          <Grid item xs={12}>
            <h3>{ title }</h3>
            <b>{ author }</b> { `(${year})` }
            { category }
          </Grid>
          <Grid item xs={4}>
            {pic_name && (
              <Box className={classes.imageContainer}>
                <GatsbyImage className={classes.image} image={bookPic} alt={pic_name}/>
              </Box>
            )}
          </Grid>
          <Grid item xs={8}>
            { `${comment.substring(0, 400)}...` }
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );

}

export default Book;