import React from 'react';

import { Grid } from '@material-ui/core';

import useBooks from '../hooks/useBooks';
import Book from './Book';

const Books = () => {
  const books = useBooks();
  const categories = new Set(books.map(({ category }) => category));

  return (
    <>
      <Grid 
        container 
        spacing={4}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        {books.map(book => {
          return (
            <Book {...book} />
          );
        })}
      </Grid>
    </>
  );
}

export default Books;