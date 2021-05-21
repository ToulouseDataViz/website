import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

import useSponsors from '../hooks/useSponsors';
import usePics from '../hooks/usePics';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    maxHeight: 200,
    maxWidth: 200,
    padding: theme.spacing(2),
    backgroundColor: 'white',
  },
}));

const Sponsors = () => {
  const classes = useStyles();

  const sponsors = useSponsors();
  const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');
  const getPic = (myName) => sponsorsPics.find(({ name }) => myName === name)?.gatsbyImageData;

  return (
    <Grid container spacing={2}>
      {sponsors.map(({ name, type, pic_name, link, description }) => {
        const sponsorPic = getPic(pic_name);

        return (
          <React.Fragment key={name}> 
            <Grid item xs={12} sm={6} >
              <Grid container 
                direction="column"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  { sponsorPic && ( 
                    <Box className={classes.imageContainer}>
                      <a href={link} target="_blank" rel="noreferrer">
                        <GatsbyImage className={classes.image} image={sponsorPic} alt={pic_name}/>
                      </a>
                    </Box>
                  )}
                </Grid>
                { description && (
                  <Grid item>{ description }</Grid>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        )
      })}
    </Grid>
  );
}

export default Sponsors
