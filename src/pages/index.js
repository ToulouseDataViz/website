import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Banner from '../components/Banner';
import useSiteMetadata from '../hooks/useSiteMetadata';
import useHomeContent from '../hooks/useHomeContent';
import Gallery from '../components/Gallery';

//TODO: fix that hell - the picture are included here to be processed by the nightmare framework named Gatsby 
import picAssociation from '../assets/images/picAssociation.jpg';
import picNewsletter from '../assets/images/vignette_newsletter_3.jpg';
import picClub from '../assets/images/picClub.jpg';
import picEvenements from '../assets/images/picEvenements.jpg';
import picHackaviz from '../assets/images/picHackaviz.jpg';
import picRessources from '../assets/images/vignette_collection_2.png';
import picGuide from '../assets/images/picGuide.jpg';
import picSponsors from '../assets/images/logo_sponsors_vignette.png';
import picExposition from '../assets/images/picExposition.jpg';
import usePics from '../hooks/usePics';

//TODO: fix that hell - why so much
const backgroundPics = {
  picAssociation: picAssociation,
  picNewsletter: picNewsletter,
  picClub: picClub,
  picExposition: picExposition,
  picEvenements: picEvenements,
  picHackaviz: picHackaviz,
  picRessources: picRessources,
  picGuide: picGuide,
  picSponsors: picSponsors,
};


// not refreshed properly at start :(
const useResizeHook = false;
const HomeIndex = ({ location }) => {
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
    <Layout location={location} hideFooter={false}>
      <Helmet
        title={headerTitle + ' ' + headerSubtitle}
        meta={[
          { name: 'description', content: 'site Toulouse DataViz' },
          { name: 'keywords', content: 'Toulouse DataViz, TDV' },
        ]}></Helmet>

      <Banner />

      <div id="main">
        <section id="two" class="spotlights" >

          <div data-testid="main-gallery" className="inner" style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <Gallery
              type={'small'}
              limit={galleryLimit}
              style={{
                height: '100px',
              }}
              picsToDisplay={usePics().filter(({ relativeDirectory }) => relativeDirectory.startsWith('front-gallery-pics'))}
            />
            <Link style={{
              border: "1px solid",
              margin: "8px",
              fontSize: "0.8em",
              padding: "9px 9px",
              display: "flex",
              alignSelf: "center",
              fontWeight: "bold"
            }} to={"/galerie"} className="link primary">Galerie</Link>
          </div>
        </section>
        <section data-testid="main-tiles" id="one" className="tiles">
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
