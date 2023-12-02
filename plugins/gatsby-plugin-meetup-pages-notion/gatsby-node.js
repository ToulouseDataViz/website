const path = require('path');
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const resultEvents = await graphql(`
    {
      allNotionPage(filter: {properties: {meetupid: {number: {ne: null}}}}) {
        nodes {
          id
          properties {
            meetupid {
              number
            }
          }
        }
      }
    }
  `);

  if (resultEvents.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  resultEvents.data.allNotionPage.nodes.forEach(({ id, properties: { meetupid }}) => {
    if (meetupid?.number) {
      const meetupidValue = meetupid.number;
      /**
       * Create meetup pages
       */
      createPage({
        path: path.join('event', meetupidValue.toString()),
        component: path.resolve('./src/templates/EventPage.js'),
        context: { id },
      });
    }
  });


};
