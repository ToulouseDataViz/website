const path = require('path');
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
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
  /*
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
  */

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allNotionPage.nodes.forEach(({ id, properties: { meetupid }}) => {
  // result.data.allNotion.nodes.forEach(({ id, properties: { meetupid }}) => {
    if (meetupid?.number) {
    //if (meetupid?.value) {
      // const meetupidValue = meetupid.value;
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
