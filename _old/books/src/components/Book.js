import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InternalImage from '../components/InternalImage';
import PrevNextPage from '../components/PrevNextPage';
import Button from '../components/Button';

const useStyles = makeStyles({
  imageContainer: {
    textAlign: 'center',
  },
});

const Book = ({ id, title, author, category, pic_name, year, comment, max = null, fullWidth = false }) => {
  const classes = useStyles();

  const bookDescription = fullWidth
    ? comment
    : `${comment.substring(0, 400)}...`;

  const gridSm = fullWidth
    ? 12
    : 6;

  return (
    <Grid item xs={12} sm={gridSm}>
      <Box class={classes.content}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <h3>{ title }</h3>
            <b>{ author }</b> { `(${year})` }
            <p>Catégorie: <b>{category}</b></p>
          </Grid>
          <Grid item xs={4}>
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
            {bookDescription}
          </Grid>

          {!fullWidth && (
            <Button
              link={`book/${id}`}
              type={'internal'}
              text={"Plus de détails"}
              size={"small"}
            />
          )}

          {fullWidth && max && (
            <PrevNextPage
              currentItemId={parseInt(id,10)}
              lastItemId={max}
              itemName={'Livre'}
              itemPath={'book'}
            />
          )}
        </Grid>
      </Box>
    </Grid>
  );

}

export default Book;