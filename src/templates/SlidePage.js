import React from 'react';
import { graphql } from 'gatsby';

import Helmet from 'react-helmet';
import Layout from '../components/layout';

import useSlides from '../hooks/useSlides';

import Slide from '../components/Slide';

const SlidePage = ({ 
  data: { slide }
}) => {
  const { max } = useSlides();
  const slideAdditionalProps = {
    fullWidth: true,
    max,
  };

  const slideProps = {...slide, ...slideAdditionalProps};

  return (
    <Layout>
      <Helmet>
        <title>{slide.title}</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <Slide {...slideProps} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default SlidePage;

export const pageQuery = graphql`
  query ($id: String) {
    slide: slidesCsv(id: { eq: $id }) {
      id
      title
      author
      category
      pic_name
      year
      url
      comment      
    }
  }
`;
