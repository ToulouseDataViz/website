import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useSponsors from '../hooks/useSponsors';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    alignSelf: 'center',
  },

  link: {
    marginRight: '0.25em',
  },
}));

const FooterSponsors = () => {
  const classes = useStyles();
  const FooterSponsors = useSponsors()
    .filter(({ inactive }) => !inactive)
    .sort((a, b) => a.rank - b.rank);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      className={classes.container}>
      Nos sponsors :
      {FooterSponsors.map(({ name, pic_name }) => {
        return (
          <React.Fragment key={pic_name}>
            <a className={classes.link} href={`/sponsor/${pic_name}`}>
              {name}
            </a>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default FooterSponsors;
