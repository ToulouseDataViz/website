import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Banner from '../components/Banner'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useHomeContent from '../hooks/useHomeContent'
import Gallery from '../components/Gallery'

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'

const backgroundPics = {
  0: pic01,
  1: pic02,
  2: pic03,
  3: pic04,
  4: pic05,
  5: pic06,
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

        <section id="two" class="spotlights">
          <div className="inner">
            <Gallery
              type={'small'}
            />
          </div>
        </section>

        <section id="one" className="tiles">

          {homeContentCsv.map(({ title, subtitle, slug }, index) => {
            return (
              <article key={`article-${index}`} style={{backgroundImage: `url(${backgroundPics[index]})`}}>
                <header className="major">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </header>
                <Link to={slug} className="link primary"></Link>
            </article>
            )
          })}

        </section>

        <section id="two">
          <div className="inner">
            <header className="major">
              <h2>Massa libero</h2>
            </header>
            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
            <ul className="actions">
              <li><Link to="/landing" className="button next">Get Started</Link></li>
            </ul>
          </div>
        </section>

      </div>

    </Layout>
  )
}

export default HomeIndex