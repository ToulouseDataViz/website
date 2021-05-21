const path = require('path');
const markdwonFilename = /\/([0-9]*).md/;

exports.onCreateNode = ({ 
  node, 
  actions: { createNodeField }, 
  loadNodeContent,
  getNodesByType,
}) => {

  // Create a link to the markdown node
  if (node.internal.type === 'EventsCsv') {
    const meetupid = JSON.parse(JSON.stringify(node))['meetupid'];

    const markdwonDescription = getNodesByType('MarkdownRemark').find(({ fileAbsolutePath }) => fileAbsolutePath.match(markdwonFilename)[1] === meetupid);
    
    // add handling of undefined node
    
    createNodeField({
      node,
      name: "Markdown___NODE",
      value: markdwonDescription.id,
    });
    
    
  }
}
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allEventsCsv {
        nodes {
          id
          meetupid
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  /**
   * Create meetup pages
   */
  result.data.allEventsCsv.nodes.forEach(({ id, meetupid }) => {
    createPage({
      path: path.join('meetup', meetupid),
      component: path.resolve('./src/templates/MeetupPage.js'),
      context: { id },
    });
  });
};
