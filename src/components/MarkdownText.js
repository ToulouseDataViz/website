import React from 'react';
import Rehype2react from 'rehype-react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { formatH1, formatTable, formatIframe } from '../helper';

const useStyles = makeStyles(theme => ({
  markdown: {
    '& .MuiTypography-body1 + .MuiTypography-body1:not(li)': {
      margin: theme.spacing(2, 0),
    },
  }
}));

const MarkdownText = ({ hast, className, ...rest }) => {
  const classes = useStyles();

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

  return (
    <Box {...rest}>{renderAst(hast)}</Box>
  );
};

export default MarkdownText;
