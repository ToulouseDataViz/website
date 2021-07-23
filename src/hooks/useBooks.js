import { graphql, useStaticQuery } from 'gatsby';

export const useBooks = () => {
  const { allBooksCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allBooksCsv {
        nodes {
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

  return nodes;
};

export default useBooks;