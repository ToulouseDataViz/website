import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const { site: { siteMetadata } } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          headerTitle
          headerSubtitle
          headline
          description
          actionButton
        }
      }
    }
  `);

  return siteMetadata;
};

export default useSiteMetadata;
