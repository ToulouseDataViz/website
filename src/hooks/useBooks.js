import { graphql, useStaticQuery } from 'gatsby';

export const useBooks = () => {
  const { allBooksCsv } = useStaticQuery(graphql`
    query {
      allBooksCsv {
        max(field: id)
        nodes {
          id
          title
          author
          category
          pic_name
          year
          comment
        }
      }
    }
  `);

  return allBooksCsv;
};

export default useBooks;