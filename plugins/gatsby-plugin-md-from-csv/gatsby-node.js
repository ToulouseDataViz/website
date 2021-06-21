exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, createParentChildLink } = actions;

  const participants = getNodesByType('HackavizParticipantsCsv');

  participants.forEach((parentNode, index) => {
    const childrenNodeId = createNodeId(`HackavizParticipantsCsv-${index}-MarkdownDescription`);
    const markdownNode = {
      id: childrenNodeId,
      parent: parentNode.id,
      children: [],
      internal: {
        type: `markdwonDescriptionFromHackavizParticipantsCsv`,
        // adding text/markdown as mediatype trigger to process of this node by the remark plugin
        mediaType: `text/markdown`,
        content: parentNode.description,
        contentDigest: createContentDigest(parentNode.description),
      },
    }
    createNode(markdownNode);

    createParentChildLink({ parent: parentNode, child: markdownNode });
  }); 
}