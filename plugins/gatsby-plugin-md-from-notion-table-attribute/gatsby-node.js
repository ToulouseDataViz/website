exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createParentChildLink } = actions;

  const meetupsNotion = getNodesByType('NotionPage').filter(node => node.properties?.meetupid?.number != null);

  meetupsNotion.forEach((parentNode, index) => {
    const childrenNodeId = createNodeId(`Notion-${index}-MarkdownDescription`);
    const descriptionContent = parentNode.properties.description?.rich_text?.map(({ plain_text }) => plain_text).join('');

    if (descriptionContent) {
      const markdownNode = {
        id: childrenNodeId,
        parent: parentNode.id,
        children: [],
        internal: {
          type: `markdownDescriptionFromNotion`,
          // adding text/markdown as mediatype trigger to process of this node by the remark plugin
          mediaType: `text/markdown`,
          content: descriptionContent,
          contentDigest: createContentDigest(descriptionContent),
        },
      }
      createNode(markdownNode);
  
      createParentChildLink({ parent: parentNode, child: markdownNode });
    }
  }); 
}