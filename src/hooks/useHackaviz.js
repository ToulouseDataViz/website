import { graphql, useStaticQuery } from 'gatsby';

export const useHackaviz = () => {
  const { allHackavizCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allHackavizCsv {
        nodes {
          hackaviz
          date
          videoLink
          description
        }
      }
    }
  `);

  return nodes;
};

export default useHackaviz;