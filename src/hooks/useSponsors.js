import { graphql, useStaticQuery } from 'gatsby';

export const useSponsors = () => {
  const {
    allSponsorsCsv: { nodes },
  } = useStaticQuery(graphql`
    query {
      allSponsorsCsv {
        nodes {
          name
          type
          pic_name
          link
          children {
            ... on markdownDescriptionFromSponsorsCsv {
              childMarkdownRemark {
                htmlAst
              }
            }
          }
        }
      }
    }
  `);

  return nodes;
};

export default useSponsors;
