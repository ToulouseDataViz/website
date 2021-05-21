import React from "react";
import { graphql } from "gatsby";

import Helmet from 'react-helmet';
import Layout from '../components/layout';
import PageBanner from '../components/PageBanner';
import MarkdownText from '../components/MarkdownText';

const OffrePage = ({ data: { markdownRemark: { frontmatter: { title } , htmlAst } } }) => {

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <PageBanner 
        styleId={4}
        title={"Nos offres"}
        description={"Pret, partez, visualiez !"}
      />

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{title}</h1>
            </header>
            <MarkdownText
              hast={htmlAst}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`

export default OffrePage