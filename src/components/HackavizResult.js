import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Button from './Button';
import usePics from '../hooks/usePics';
import MarkdownText from './MarkdownText';

import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  participants: {
    backgroundColor: '#2e3450',
    padding: theme.spacing(2),
    textAlign: 'left',
    fontSize: 'initial',
  },
  content: {
    textAlign: 'center',
  },
  leftAlign: {},
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    border: '4px solid #242943',
  },
}));

const getName = (nom, isDense) => {
  if (isDense) {
    return <p>{nom}</p>;
  } else {
    return <h3>{nom}</h3>;
  }
};

const getPrice = (prix, isDense) => {
  if (isDense) {
    return (
      <p>
        <b>{prix}</b>
      </p>
    );
  } else {
    return <h2>{prix}</h2>;
  }
};

const HackavizResult = ({ nom, outils, prix, pic_name, link, children, columnValue, isDense = false }) => {
  const classes = useStyles();
  const resultsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'hackaviz-result-pics');
  const resultPic = getPic(resultsPics, pic_name);

  const participantStyle = clsx({
    [classes.participants]: !isDense,
  });

  const markdownDescription = children[0]?.childMarkdownRemark?.htmlAst;

  return (
    <Grid item xs={12} sm={columnValue}>
      <Box class={classes.content}>
        {prix && getPrice(prix, isDense)}
        <Box class={participantStyle}>
          {pic_name && (
            <Box className={classes.imageContainer}>
              <GatsbyImage className={classes.image} image={resultPic} alt={pic_name} />
            </Box>
          )}
          {getName(nom, isDense)}
          {!isDense && markdownDescription && <MarkdownText className={classes.textAlign} hast={markdownDescription} />}
          {!isDense && (
            <p>
              <b>Outils</b>
              {`: ${outils}`}
            </p>
          )}
          {link && (
            <Button
              link={link}
              text={isDense ? 'Voir' : 'Voir la réalisation'}
              size={isDense ? 'small' : ''}
              display={'special'}
            />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default HackavizResult;
