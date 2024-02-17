import React from 'react';
import Rehype2react from 'rehype-react';

import Box from '@material-ui/core/Box';

import { formatH1, formatTable, formatIframe } from '../utils/misc';
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */
const MarkdownText = ({ hast, className, ...rest }) => {
  const renderAst = new Rehype2react({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      h1: ({ children, ...props }) => formatH1({ children, ...props }),
      h2: props => <h2 {...props} />,
      h3: props => <h3 {...props} />,
      h4: props => <h4 {...props} />,
      h5: props => <h5 {...props} />,
      h6: props => <h6 {...props} />,
      p: props => <p {...props} />,
      li: props => <li {...props} />,
      iframe: props => formatIframe(props),
      table: props => formatTable(props),
      img: props => <img {...props} />,
    },
  }).Compiler;

  return <Box {...rest}>{renderAst(hast)}</Box>;
};

export default MarkdownText;
