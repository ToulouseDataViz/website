import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Banner from '../components/Banner';
import useSiteMetadata from '../hooks/useSiteMetadata';
import useHomeContent from '../hooks/useHomeContent';
import Gallery from '../components/Gallery';

import pic01 from '../assets/images/pic01.jpg';
import pic02 from '../assets/images/vignette_newsletter_3.jpg';
import pic03 from '../assets/images/pic03.jpg';
import pic04 from '../assets/images/pic04.jpg';
import pic05 from '../assets/images/pic05.jpg';
import pic06 from '../assets/images/vignette_collection_2.png';
import pic07 from '../assets/images/pic07.jpg';

import usePics from '../hooks/usePics';

const backgroundPics = {
  pic01: pic01,
  pic02: pic02,
  pic03: pic03,
  pic04: pic04,
  pic05: pic05,
  pic06: pic06,
  pic07: pic07,
};

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

// not refreshed properly at start :(
const useResizeHook = false;
const HomeIndex = () => {
  const { headerTitle, headerSubtitle } = useSiteMetadata();
  const homeContentCsv = useHomeContent();


  const galleryLimit = 8;

  if (useResizeHook) {
    // const [windowSize, setWindowSize] = useState([
    //   typeof window !== 'undefined' && window.innerWidth,
    //   typeof window !== 'undefined' && window.innerHeight,
    // ]);
    // useEffect(() => {
    //   const debouncedHandleResize = debounce(function handleResize() {
    //     setWindowSize([
    //       typeof window !== 'undefined' && window.innerWidth,
    //       typeof window !== 'undefined' && window.innerHeight,
    //     ]);
    //   }, 1000);
    //   window.addEventListener('resize', debouncedHandleResize);
    //   return () => {
    //     window.removeEventListener('resize', debouncedHandleResize);
    //   };
    // }, []);
    // galleryLimit = windowSize[0] < 1280 ? 4 : 8;
  }

  return (
    <Layout hideFooter={false}>
      <Helmet
        title={headerTitle + ' ' + headerSubtitle}
        meta={[
          { name: 'description', content: 'site Toulouse DataViz' },
          { name: 'keywords', content: 'Toulouse DataViz, TDV' },
        ]}></Helmet>

      <Banner />

      <div id="main">
        <section id="two" class="spotlights" >
          
            <div className="inner">
            <Gallery
              type={'small'}
              limit={galleryLimit}
              style={{
                height: '100px',
              }}
              picsToDisplay={usePics().filter(({ relativeDirectory }) => relativeDirectory.startsWith('front-gallery-pics'))}
            />
          
            
          </div>
        </section>
        <section id="one" className="tiles">
          {homeContentCsv.map(({ title, subtitle, slug, backgroundPicture }, index) => {
            return (
              <article
                key={`article-${index}`}
                style={{ backgroundImage: `url(${backgroundPics[backgroundPicture]})` }}>
                <header className="major">
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                
                </header>
                  <Link to={slug} className="link primary"></Link>
              </article>
            );
          })}
        </section>
      </div>
    </Layout>
  );
};

export default HomeIndex;
