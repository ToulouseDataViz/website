const path = require('path');
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allNotion {
        nodes {
          id
          properties {
            meetupid {
              value
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allNotion.nodes.forEach(({ id, properties: { meetupid }}) => {
    if (meetupid?.value) {
      const meetupidValue = meetupid.value;
      /**
       * Create meetup pages
       */
      createPage({
        path: path.join('meetup', meetupidValue.toString()),
        component: path.resolve('./src/templates/MeetupPage.js'),
        context: { id },
      });
    }
  });
};
