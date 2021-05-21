const regexpVideoId = /v=(.*)&/;
export const getVideoEmbedId = videoLink => {
  return videoLink
    ? videoLink.match(regexpVideoId)[1]
    : null 
};

export const getPic = (pics, myName) => pics.find(({ name }) => myName === name)?.gatsbyImageData;