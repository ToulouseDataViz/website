import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import useOffres from '../hooks/useOffres';
import usePics from '../hooks/usePics';

import { getPic } from '../helper';

const Offres = () => {
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
