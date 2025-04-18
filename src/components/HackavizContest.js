import React from 'react';
import Button from './Button';

import PageBanner from './PageBanner';

import InternalImage from './InternalImage';
import HackavizFooter from './HackavizFooter';
import { getLocaleYear, formatOrdinals, getLocaleMonth, getLocaleDate, dateDiffInDays } from '../utils/hackaviz';

const veryFirstHackavizYear = 2018;

/**
 * render contest presentation
 * @param {Date} startDate start date of hackaviz submission  eg. new Date("2024-03-08") in ISO format YYYY-MM-DD
 * @param {Date} endDate end date of hackaviz submission
 * @param {string} tallyFormUrl URL of tally submission form
 * @param {Date} partyDate hackaviz party
 * @param {?string} extraMessage optional string
 * @param {?Array<{url: string, buttonLabel: string}>} customDataButtons replace mdx hackaviz data page by custom buttons
 */
const HackavizContest = ({ startDate, endDate, tallyFormUrl, partyDate, extraMessage, customDataButtons }) => {
  const year = getLocaleYear(startDate);

  const ranking = Number.parseInt(year) - veryFirstHackavizYear + 1;

  const isTimeToRelease = startDate.getTime() < new Date().getTime();
  const nbDays = dateDiffInDays(startDate, endDate)

  return (
    <>
      <PageBanner
        styleId={1}
        title={`Hackaviz ${year}`}
        description={`La ${formatOrdinals(ranking)} édition du Hackaviz revient en ${getLocaleMonth(startDate)} !`}
      />

      <section id="one">
        <div className="inner">
          L’association Toulouse Dataviz (TDV) organise son HACKAVIZ, un concours de visualisation de données en temps
          limité, seul ou en équipe, doté de récompenses, ouvert à un très large public.
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '600px' }}>
              <InternalImage name={`H${year}_hackavizAnnonce`} altText={''} />
            </div>
          </div>
          <h1> LE PRINCIPE</h1> Raconter une histoire avec des graphiques, à partir d’un jeu de données inédit, seul ou
          en équipe. A partir du moment ou les données sont mises à disposition, les candidats ont {nbDays} jours pour rendre
          leur création. {extraMessage}
          <ul>
            <li>
              Date de mise à disposition des données : <b>{getLocaleDate(startDate)}</b>
            </li>
            <li>
              Date limite de remise des contributions : <b>{getLocaleDate(endDate)}</b>
            </li>
            <li>
              Hackaviz Party - Présentation des réalisations et remise des prix : <b>{getLocaleDate(partyDate)}</b>
            </li>
          </ul>
          <div align="center">
            <Button link={`https://${tallyFormUrl}`} text={"Je m'inscris"} />
          </div>
          <h1>PRÉPARER L’HACKAVIZ</h1> Voici des newsletters pour vous préparer à l'hackaviz. Elles ont été écrites pour
          l'hackaviz précédent mais elles restent toujours d'actualité.
          <div>
            <Button
              link={'https://newsletters.toulouse-dataviz.fr/newsletter--toulouse-dataviz-13--spcial-hackaviz-2021'}
              text={'#13 - Spécial Hackaviz 1/4'}
            />
            <Button
              link={'https://newsletters.toulouse-dataviz.fr/newsletter--toulouse-dataviz-14--spcial-hackaviz-2021'}
              text={'#14 - Spécial Hackaviz 2/4'}
            />
            <Button
              link={'https://newsletters.toulouse-dataviz.fr/newsletter--toulouse-dataviz-15--spcial-hackaviz-2021'}
              text={'#15 - Spécial Hackaviz 3/4'}
            />
            <Button
              link={'https://newsletters.toulouse-dataviz.fr/newsletter--toulouse-dataviz-16--spcial-hackaviz-2021'}
              text={'#16 - Spécial Hackaviz 4/4'}
            />
          </div>
          <h1>LE JEU DE DONNÉES</h1>
          {isTimeToRelease && (
            <>
              <div>Cette année, nous proposons un jeu de données inédit.</div>
              {customDataButtons &&
                <div align="center">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {customDataButtons.map(customDataButton =>
                      <Button link={customDataButton.url} text={customDataButton.buttonLabel} />)
                    }
                  </div>
                </div>
              }
              {!customDataButtons && (
                <div align="center">
                  <Button link={`/hackaviz/${year}-data`} type={'internal'} text={'Télécharger les données'} />
                </div>)
              }
            </>
          )}
          {!isTimeToRelease && <i>Données disponibles le {getLocaleDate(startDate)}</i>}
          <h1>LES RÈGLES, L'ÉVALUATION et L'HACKAVIZ PARTY</h1>
          <Button link={`/hackaviz/reglement`} type={'internal'} text={'Voir le détail'} />
          <HackavizFooter year={year} />
        </div>
      </section>
    </>
  );
};

export default HackavizContest;
