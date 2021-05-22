import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';
import usePics from '../hooks/usePics';

import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  participants: {
    backgroundColor: '#2e3450',
    padding: theme.spacing(2),
  },
  imageContainer: {
    textAlign : 'center',
  },
  image: {
    border: '4px solid #242943',
  }
}));

const HackavizResult = ({ nom, outils, prix, pic_name, link, description, columnValue }) => {
  const classes = useStyles();
  const resultsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'hachaviz-result-pics');
  const resultPic = getPic(resultsPics, pic_name);

  return (
    <Grid item xs={12} sm={columnValue}>
      {prix && (<h2>{ prix }</h2>)} 
      <Box class={classes.participants}>
        {pic_name && (
          <Box className={classes.imageContainer}>
            <GatsbyImage className={classes.image} image={resultPic} alt={pic_name}/>
          </Box>
        )}
        <h3>{nom}</h3>
        <p>{ description }</p>
        <p><b>Outils</b>{`: ${outils}`}</p>
        {link && (
          <Button
            link={link}
            text={'Voir la réalisation'}
            display={'special'}
        />
        )}
      </Box>
    </Grid>
  );

}

export default HackavizResult;