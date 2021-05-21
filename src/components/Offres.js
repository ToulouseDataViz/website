import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

import useOffres from '../hooks/useOffres';
import usePics from '../hooks/usePics';

import Button from '../components/Button';
import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    width: 200,
  },
  image: {
    height: theme.spacing(25),
  },
  linkicon: {
    margin: theme.spacing(1,0),
  }
}));

const Offres = () => {
  const classes = useStyles();

  const offres = useOffres();
  const offresPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'offres-pics');
  
  return (
    <section id="two" className="spotlights">
      {offres.map(({ id, title, slug, pic_name, description }) => {
        const offrePic = getPic(offresPics, pic_name);

        return (
          <section key={`offres-section-${title}`}>
            {offrePic && (<GatsbyImage image={offrePic} alt={pic_name}/>)}
            <div className="content">
              <div className="inner">
                  <header className="major">
                      <h3>{title}</h3>
                  </header>
                  {description && (<p>{description}</p>)}
                  {slug && (
                    <ul className="actions">
                      <li><Link to={`/offres/${slug}`} className="button">En savoir plus</Link></li>
                  </ul>
                  )}
              </div>
            </div>
          </section>
        )
      })}
    </section>
  );
}

export default Offres
