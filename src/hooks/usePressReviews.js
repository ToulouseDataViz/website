import { graphql, useStaticQuery } from 'gatsby';

export const usePressReview = () => {
  const { allPressReviewsCsv } = useStaticQuery(graphql`
    query {
      allPressReviewsCsv {
        nodes {
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
    }
  `);

  return allPressReviewsCsv;
};

export default usePressReview;