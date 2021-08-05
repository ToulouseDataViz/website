import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import _vars from '../assets/scss/libs/_vars.scss';

import useBooks from '../hooks/useBooks';
import Book from './Book';

// TBD : collect SCSS variables to use in JS
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      // backgroundColor: "yellow", 
    },
    padding: theme.spacing(2),
    //https://material-ui.com/customization/components/#use-rulename-to-reference-a-local-rule-within-the-same-style-sheet
    '&$selected': {
      backgroundColor: '#ffffff',
      "& > span": {
        color: "#242943",
        fontWeight: 'bold',
      }
    },
  },
  selected: {},
  label: {
    color: '#ffffff',
  },
}));

const Books = () => {
  const classes = useStyles();
  console.log(_vars);

  const { nodes: books } = useBooks();
  const categories = Array.from(new Set(books.map(({ category }) => category)));

  const [displayCategories, setDisplayCategories] = useState(categories);
  const handleCategoriesChange = (event, newCategories) => {
    setDisplayCategories(newCategories);
  };

  const displayedBooks = books.filter(({ category }) => displayCategories.includes(category));

  return (
    <>
      <p>Filtrer les livres selon les catégorie</p>
      <ToggleButtonGroup value={displayCategories} onChange={handleCategoriesChange}>
        {categories.map(category => (
          <ToggleButton value={category} classes={{
            selected: classes.selected,
            root: classes.root,
            label: classes.label,
          }}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <hr/>

      <Grid 
        container 
        spacing={4}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        {displayedBooks.map(book => {
          return (
            <Book {...book} />
          );
        })}
      </Grid>
    </>
  );
}

export default Books;