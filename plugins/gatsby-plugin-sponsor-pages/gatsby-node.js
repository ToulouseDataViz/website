const path = require('path');

exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allSponsorsCsv {
        nodes {
          inactive
          rank
          name
          type
          pic_name
          link                   
          children {
            ... on markdownDescriptionFromCsv {
              childMarkdownRemark {
                htmlAst
              }
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

  /**
   * Create offres pages
   */
  const assoSponsors = result.data.allSponsorsCsv.nodes.filter(({ inactive }) => !inactive).sort((a,b)=>a.rank-b.rank);
  assoSponsors.forEach(({pic_name}) => {
    createPage({
      path: path.join('sponsor', pic_name.toString()),
      component: path.resolve('./src/templates/SponsorPage.js'),
      context: { pic_name },
    });
  });
};

