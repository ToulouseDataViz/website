import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Banner from '../components/Banner';
import useSiteMetadata from '../hooks/useSiteMetadata';
import useHomeContent from '../hooks/useHomeContent';
import Gallery from '../components/Gallery';
import Events from '../components/Events';
import Footer from '../components/Footer'
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

  const eventKey="Evènements";
  const clubKey="Le Club";

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
                  {(title === eventKey || title === clubKey) && <Link to={slug} className="link primary"></Link>}
                </header>
                <>
                  {(title !== eventKey && title !== clubKey) && <Link to={slug} className="link primary"></Link>}
                  {(
                    title === eventKey && (
                      <div
                        style={{
                          minWidth:'50%',
                          maxWidth:'450px',                          
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
                    )
                  )}
                  {
                    (
                      title === clubKey && (
                        <div className="inner card"  style={{
                          
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'space-between'                          
                        }} >
                        <Gallery type={'small'} limit={8} style={{height: "75%"}}/>
                        <Footer hideCopyright />
                      </div>
                      )
                    )
                  }
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
