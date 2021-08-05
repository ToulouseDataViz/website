import React from 'react';

import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navitem: {
    margin: theme.spacing(1,0),
  },
}));

const PrevNextPage = ({ currentItemId, lastItemId, itemName, itemPath }) => {
  const classes = useStyles();
  console.log(currentItemId);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      {(currentItemId > 1) && (
        <a 
          href={`/${itemPath}/${currentItemId - 1}`} 
          className={clsx(classes.navitem,"button", "medium")}
        >
          {`${itemName} précédent`}
        </a>
      )}
      {(currentItemId < lastItemId) && (
        <a href={`/${itemPath}/${currentItemId + 1}`} className="button medium">
          {`${itemName} suivant`}
        </a>
      )}
    </Grid>
  );
};

export default PrevNextPage;
