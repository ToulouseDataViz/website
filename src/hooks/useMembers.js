import { graphql, useStaticQuery } from 'gatsby';

export const useMembers = () => {
  const { allMembresCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allMembresCsv {
        nodes {
          nom
          pic_name
          twitter
          nom_site
          linkedin
          lien_site
          is_old
        }
      }
    }
  `);

  return nodes;
};

export default useMembers;