import React from 'react';
import Gallery from '../components/Gallery';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Button from './Button';
import usePics from '../hooks/usePics';
import MarkdownText from './MarkdownText';

import { getPicName } from '../helper';

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

const HackavizResult = ({
  nom,
  outils,
  prix,
  pic_name,
  link,
  link2,
  children,
  columnValue,
  /** compact mode used in main hackaviz page */
  isDense = false,
}) => {
  const classes = useStyles();
  const resultsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'hackaviz-result-pics');
  const resultPic = getPicName(resultsPics, pic_name);

  const participantStyle = clsx({
    [classes.participants]: !isDense,
  });

  const markdownDescription = children[0]?.childMarkdownRemark?.htmlAst;

  return (
    <Grid item xs={12} sm={columnValue}>
      <Box class={classes.content}>
        {prix && getPrice(prix, isDense)}
        <Box class={participantStyle} style={{ display: 'flex', flexDirection: 'column' }}>
          {pic_name && (
            <Gallery
              style={isDense ? { display: 'flex' } : { height: '500px', display: 'flex' }}
              picsToDisplay={[resultPic]}
              limit={1}
              embedInBox={false}
              maxHeight={isDense ? undefined : '500px'}
              displayLightBoxOnClick={true}
            />
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
              style={isDense ? { width: '100px', alignSelf: 'center' } : { width: '220px', alignSelf: 'center' }}
            />
          )}
          {link2 && (
            <Button
              link={link2}
              text={isDense ? 'Voir' : 'Second lien'}
              size={isDense ? 'small' : ''}
              style={isDense ? { width: '100px', alignSelf: 'center' } : { width: '220px', alignSelf: 'center' }}
            />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default HackavizResult;
