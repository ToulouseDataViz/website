import { graphql, useStaticQuery } from 'gatsby';

export const useSlides = () => {
  const { allSlidesCsv } = useStaticQuery(graphql`
    query {
      allSlidesCsv {
        max(field: id)
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

  return allSlidesCsv;
};

export default useSlides;