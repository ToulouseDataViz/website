exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createParentChildLink } = actions;

  const meetupsNotion = getNodesByType('Notion');

  meetupsNotion.forEach((parentNode, index) => {
    const childrenNodeId = createNodeId(`Notion-${index}-MarkdownDescription`);
    const descriptionContent = parentNode.properties.description?.value;

    if (descriptionContent) {
      const markdownNode = {
        id: childrenNodeId,
        parent: parentNode.id,
        children: [],
        internal: {
          type: `markdwonDescriptionFromNotion`,
          // adding text/markdown as mediatype trigger to process of this node by the remark plugin
          mediaType: `text/markdown`,
          content: descriptionContent,
          contentDigest: descriptionContent,
        },
      }
      createNode(markdownNode);
  
      createParentChildLink({ parent: parentNode, child: markdownNode });
    }
  }); 
}