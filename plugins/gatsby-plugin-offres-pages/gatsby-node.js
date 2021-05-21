const path = require('path');

exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/offres-description/"}}) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  /**
   * Create offres pages
   */
  result.data.allMarkdownRemark.nodes.forEach(({ id, frontmatter: { slug } }) => {
    createPage({
      path: path.join('offres', slug),
      component: path.resolve('./src/templates/OffrePage.js'),
      context: { slug },
    });
  });
};
