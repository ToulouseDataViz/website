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
              layout: CONSTRAINED
              placeholder: BLURRED
              quality: 95
            )
          }
        }
      }
    }
  `);

  return nodes.map(({ id, name, relativeDirectory, childImageSharp }) => {
    const _imageData = childImageSharp;
    return {
      id: id,
      relativeDirectory: relativeDirectory,
      name: name,
      gatsbyImageData: _imageData && _imageData.gatsbyImageData,
    }
  });
};

export default usePics;