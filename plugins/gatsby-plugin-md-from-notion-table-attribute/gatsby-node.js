exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createParentChildLink } = actions;

  // const meetupsNotion = getNodesByType('Notion');
  const meetupsNotion = getNodesByType('NotionPage').filter(node => node.properties?.meetupid?.number != null);
  const meetupsRemark = getNodesByType('MarkdownRemark').filter(node => node.frontmatter?.meetupid != null);

  console.log('meetupsNotion');

  meetupsRemark.forEach((parentNode, index) => {
    const childrenNodeId = createNodeId(`Notion-${index}-MarkdownDescription`);
    const descriptionContent = parentNode.frontmatter?.description;

    // get corresponding NotionPage node
    const currentNodeId = parentNode.frontmatter?.meetupid;
    const meetupNodeId = meetupsNotion.find(({ properties: { meetupid: { number } } }) => number === currentNodeId).id;
    console.log(meetupNodeId);

    //const descriptionContent = parentNode.properties.description?.value;

    if (meetupNodeId && descriptionContent) {
      const markdownNode = {
        id: childrenNodeId,
        parent: meetupNodeId,
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