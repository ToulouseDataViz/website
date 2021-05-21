import { graphql, useStaticQuery } from 'gatsby';

export const useHackavizSponsors = () => {
  const { allHackavizSponsorsCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allHackavizSponsorsCsv {
        nodes {
          hackaviz
          sponsor_name
          sponsor_pic
        }
      }
    }
  `);

  return nodes;
};

export default useHackavizSponsors;