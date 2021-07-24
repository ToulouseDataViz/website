import React from 'react';
import Button from './components/Button';

const regexpVideoId = /v=(.+?(?=\&|$))/;
export const getVideoEmbedId = videoLink => {
  return videoLink
    ? videoLink.match(regexpVideoId)[1]
    : null 
};

export const getPic = (pics, myName) => pics.find(({ name }) => myName === name)?.gatsbyImageData;

export const formatH1 = ({ children, ...props }) => (<header className="major" {...props}><h2>{children}</h2></header>);
export const formatIframe = props => <iframe style={{ backgroundColor: "white" }} {...props} />;
export const formatLink = ({ href, children, ...props }) => <Button link={href} text={children} size={'small'} {...props} />;
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
		.replace(/^\> (.*$)/gim, '$1')
		.replace(/\*\*(.*)\*\*/gim, '$1')
		.replace(/\*(.*)\*/gim, '$1')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "$1")
		.replace(/\n$/gim, '')

	return htmlText.trim()
}