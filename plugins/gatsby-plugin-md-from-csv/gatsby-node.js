/** 
Create markdown node from CSV

Declare markdownDescriptionFromCsv type to be used in GraphQL hook with remark plugin - eg.           
```Ini      
children {
  ... on markdownDescriptionFromCsv {
    childMarkdownRemark {
      htmlAst
    }
  }
}
```

The GraphQL htmlAst (html formatted) node can feed a MarkdownText component
```javascript
import useGraphQLResult from '../hooks/useGraphQLResult';
const graphQLResult = useGraphQLResult()
... 
<MarkdownText hast={graphQLResult.children[0]?.childMarkdownRemark?.htmlAst} />
```
*/

// GraphQL source CSV name
let csvFileSources = [];
exports.onPreInit = (_, pluginOptions) => {
  csvFileSources = pluginOptions.csvFileSources;
};
exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    csvFileSources: Joi.array()
      .required()
      .description(`array of GraphQL source CSV name with markdown formatted description column`),
  });
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }) => {
  const { createNode, createParentChildLink } = actions;

  csvFileSources.forEach(item => {
    const csvRows = getNodesByType(item);
    csvRows.forEach((parentNode,index) => {
      // make index to each csv
      const childrenNodeId = createNodeId(`${item}-${index}-MarkdownDescription`);
      const markdownNode = {
        id: childrenNodeId,
        parent: parentNode.id,
        children: [],
        internal: {
          type: `markdownDescriptionFromCsv`,
          // adding text/markdown as mediatype trigger to process of this node by the remark plugin
          mediaType: `text/markdown`,
          content: parentNode.description,
          contentDigest: createContentDigest(parentNode.description),
        },
      };
      createNode(markdownNode);

      createParentChildLink({ parent: parentNode, child: markdownNode });
    });
  });
};
