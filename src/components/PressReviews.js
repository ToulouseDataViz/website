import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import _vars from '../assets/scss/libs/_vars.scss';

import usePressReview from '../hooks/usePressReviews';
import PressReview from './PressReview';

// TBD : collect SCSS variables to use in JS
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
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

const PressReviews = () => {
  const classes = useStyles();
  console.log(_vars);

  const { nodes: pressReviews } = usePressReview();
  const categories = Array.from(new Set(pressReviews.map(({ category }) => category)));
  categories.sort();

  const [displayCategories, setDisplayCategories] = useState(categories);
  const handleCategoriesChange = (event, newCategories) => {
    setDisplayCategories(newCategories);
  };


  let displayedPressReviews = pressReviews.filter(({ category }) => displayCategories.includes(category));
  displayedPressReviews.sort((lhs,rhs)=> rhs.id-lhs.id);

  return (
    <>
      <p>Filtrer la revue de presse selon les catégories</p>
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
        {displayedPressReviews.map(review => {
          return (
            <PressReview {...review} />
          );
        })}
      </Grid>
    </>
  );
}

export default PressReviews;