import React from 'react';
import { graphql } from 'gatsby';

import Helmet from 'react-helmet';
import Layout from '../components/layout';

import useBooks from '../hooks/useBooks';

import Book from '../components/Book';

const BookPage = ({ 
  data: { book }
}) => {
  const { max } = useBooks();
  const bookAdditionalProps = {
    fullWidth: true,
    max,
  };

  const bookProps = {...book, ...bookAdditionalProps};

  return (
    <Layout>
      <Helmet>
        <title>{book.title}</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>Les livres</h1>
            </header>
            <Book {...bookProps} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default BookPage;

export const pageQuery = graphql`
  query ($id: String) {
    book: booksCsv(id: { eq: $id }) {
      id
      title
      author
      category
      pic_name
      year
      comment
    }
  }
`;
