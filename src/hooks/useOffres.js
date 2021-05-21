import { graphql, useStaticQuery } from 'gatsby';

export const useOffres = () => {
  const { allOffresCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allOffresCsv {
        nodes {
          id
          title
          slug
          pic_name
          description
        }
      }
    }
  `);

  return nodes;
};

export default useOffres;