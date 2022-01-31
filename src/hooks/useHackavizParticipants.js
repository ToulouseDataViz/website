import { graphql, useStaticQuery } from 'gatsby';

export const useHackavizParticipants = () => {
  const { allHackavizParticipantsCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allHackavizParticipantsCsv {
        nodes {
          hackaviz
          nom
          outils
          prix
          pic_name
          link
          children {
            ... on markdownDescriptionFromHackavizParticipantsCsv {
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

export default useHackavizParticipants;