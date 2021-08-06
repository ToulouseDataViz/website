import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Banner from '../components/Banner'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useHomeContent from '../hooks/useHomeContent'
import Gallery from '../components/Gallery'
import Events from '../components/Events';
import { incomingEventStatusName } from '../settings';

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'

const backgroundPics = {
  'pic01': pic01,
  'pic02': pic02,
  'pic03': pic03,
  'pic04': pic04,
  'pic05': pic05,
  'pic06': pic06,
}

const HomeIndex = () => {
  const { headerTitle, headerSubtitle } = useSiteMetadata();
  const homeContentCsv = useHomeContent();

  return (
    <Layout>
      <Helmet
          title={headerTitle + " " + headerSubtitle}
          meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
          ]}
      >
      </Helmet>

      <Banner />

      <div id="main">
        <Events
          includeStatus={[incomingEventStatusName]}
          displayVideoFilter={false}
          wrapForPage={true}
          title={"Les évènements à venir"}
        />

        <section id="two" class="spotlights">
          <div className="inner">
            <Gallery
              type={'small'}
            />
          </div>
        </section>

        <section id="one" className="tiles">
          {homeContentCsv.map(({ title, subtitle, slug, backgroungPicture }, index) => {
            return (
              <article key={`article-${index}`} style={{backgroundImage: `url(${backgroundPics[backgroungPicture]})`}}>
                <header className="major">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </header>
                <Link to={slug} className="link primary"></Link>
            </article>
            )
          })}

        </section>
      </div>
    </Layout>
  )
}

export default HomeIndex