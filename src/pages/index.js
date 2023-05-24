import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Banner from '../components/Banner';
import useSiteMetadata from '../hooks/useSiteMetadata';
import useHomeContent from '../hooks/useHomeContent';
import Gallery from '../components/Gallery';
import Events from '../components/Events';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { incomingEventStatusName } from '../settings';

import pic01 from '../assets/images/pic01.jpg';
import pic02 from '../assets/images/pic02.jpg';
import pic03 from '../assets/images/pic03.jpg';
import pic04 from '../assets/images/pic04.jpg';
import pic05 from '../assets/images/pic05.jpg';
import pic06 from '../assets/images/pic06.jpg';
import pic07 from '../assets/images/pic07.jpg';

const backgroundPics = {
  pic01: pic01,
  pic02: pic02,
  pic03: pic03,
  pic04: pic04,
  pic05: pic05,
  pic06: pic06,
  pic07: pic07,
};

const HomeIndex = () => {
  const { headerTitle, headerSubtitle } = useSiteMetadata();
  const homeContentCsv = useHomeContent();

  const eventKey = 'Evènements';
  const guideKey = 'Guide de dataviz';
  const clubKey = 'Le Club';

  return (
    <Layout hideFooter={true}>
      <Helmet
        title={headerTitle + ' ' + headerSubtitle}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}></Helmet>

      <Banner />

      <div id="main">
        <section id="two" class="spotlights"></section>
        <section id="one" className="tiles">
          {homeContentCsv.map(({ title, subtitle, slug, backgroundPicture }, index) => {
            return (
              <article
                key={`article-${index}`}
                style={{ backgroundImage: `url(${backgroundPics[backgroundPicture]})` }}>
                <header className="major">
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                  {(title === eventKey || title === clubKey || title === guideKey )  && <Link to={slug} className="link primary"></Link>}
                </header>
                <>
                  {title !== eventKey && title !== clubKey && title !== guideKey && <Link to={slug} className="link primary"></Link>}
                  {title === eventKey && (
                    <div
                      style={{
                        minWidth: '50%',
                        maxWidth: '440px',
                      }}
                      className="card-event card">
                      <Events
                        style={{ padding: '20px' }}
                        includeStatus={[incomingEventStatusName]}
                        displayVideoFilter={false}
                        wrapForPage={false}
                        smallFormat={true}
                      />
                    </div>
                  )}
                  {title === guideKey && (
                    <div
                      className="inner card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        justifyContent: 'space-between',
                      }}>
                      <Button
                        link={
                          'https://toulouse-dataviz.notion.site/33d69905ad354e0385ccb3a12df48830?v=12bec766fd194c69b56e8145f2a2c74a'
                        }
                        text={'Notion'}
                      />
                      <Button link={'https://guides.toulouse-dataviz.fr/'} text={'Cloaked'} />
                      <Button link={'https://toulousedataviz.github.io/guide.html'} text={'GitHub Pages'} />
                    </div>
                  )}
                  {title === clubKey && (
                    <div
                      className="inner card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        justifyContent: 'space-between',
                      }}>
                      <Gallery type={'small'} limit={8} style={{ height: '75%' }} />
                      <Footer hideCopyright />
                    </div>
                  )}
                </>
              </article>
            );
          })}
        </section>
      </div>
    </Layout>
  );
};

export default HomeIndex;
