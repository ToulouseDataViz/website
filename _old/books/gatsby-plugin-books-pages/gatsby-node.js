const path = require('path');
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allBooksCsv {
        nodes {
          id
          title
          author
          category
          pic_name
          year
          comment
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allBooksCsv.nodes.forEach(({ id }) => {
    /**
     * Create books pages
     */
    createPage({
      path: path.join('book', id),
      component: path.resolve('./src/templates/BookPage.js'),
      context: { id },
    });
  });
};
