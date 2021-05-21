import { graphql, useStaticQuery } from 'gatsby';

export const usePics = () => {
  const { allFile: { nodes } } = useStaticQuery(graphql`
    query {
      allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
        nodes {
          id
          relativeDirectory
          name
          childImageSharp {
            id
            gatsbyImageData(
              width: 400
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    }
  `);

  return nodes.map(({ id, name, relativeDirectory, childImageSharp: { gatsbyImageData } }) => ({
    id: id,
    relativeDirectory: relativeDirectory,
    name: name,
    gatsbyImageData: gatsbyImageData,
  }));
};

export default usePics;