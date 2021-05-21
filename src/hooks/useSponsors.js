import { graphql, useStaticQuery } from 'gatsby';

export const useSponsors = () => {
  const { allSponsorsCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allSponsorsCsv {
        nodes {
          name
          type
          pic_name
          link
          description
        }
      }
    }
  `);

  return nodes;
};

export default useSponsors;