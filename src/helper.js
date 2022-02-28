import React from 'react';
import Button from './components/Button';

// strip out some values since YouTube embed API is different from YouTube main API
const regexpVideoId = /v=(.+?(?=&|$))/;
const regexpVideoStartTime = /t=(\d*)s/;
export const getVideoEmbedId = videoLink => {
  if (videoLink) {
    const timeStartMatch = videoLink.match(regexpVideoStartTime);
    let timeStartArg = '';
    if (timeStartMatch) {
      timeStartArg = `?start=${timeStartMatch[1]}`;
    }
    const videoLinkMatch = videoLink.match(regexpVideoId);
    return videoLinkMatch ? videoLinkMatch[1] + timeStartArg : new URL(videoLink)?.pathname;
  }
  return null;
};

export const getPic = (pics, myName) => pics.find(({ name }) => myName === name)?.gatsbyImageData;

export const formatH1 = ({ children, ...props }) => (
  <header className="major" {...props}>
    <h2>{children}</h2>
  </header>
);
export const formatIframe = props => <iframe style={{ backgroundColor: 'white' }} {...props} />;
export const formatLink = ({ href, children, ...props }) => (
  <Button link={href} text={children} size={'small'} {...props} />
);
export const formatTable = props => (
  <div className="table-wrapper">
    <table className="alt" {...props} />
  </div>
);

export const parseMarkdownToString = markdownText => {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '$1')
    .replace(/^## (.*$)/gim, '$1')
    .replace(/^# (.*$)/gim, '$1')
    .replace(/^> (.*$)/gim, '$1')
    .replace(/\*\*(.*)\*\*/gim, '$1')
    .replace(/\*(.*)\*/gim, '$1')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '$1')
    .replace(/\n$/gim, '');

  return htmlText.trim();
};
