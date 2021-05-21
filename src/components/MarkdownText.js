import React from 'react';
import clsx from 'clsx';
import Rehype2react from 'rehype-react';

import Box from '@material-ui/core/Box';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';

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
      h1: ({ children, ...props }) => (<header className="major" {...props}><h1>{children}</h1></header>),
      h2: props => <h2 {...props} />,
      h3: props => <h3 {...props} />,
      h4: props => <h4 {...props} />,
      h5: props => <h5 {...props} />,
      h6: props => <h6 {...props} />,
      p: props => <p {...props} />,
      li: props => <li {...props} />,
      a: ({ href, children, ...props }) => <Button link={href} text={children} size={'small'} {...props} />,
    },
  }).Compiler;

  return (
    <Box {...rest}>{renderAst(hast)}</Box>
  );
};

export default MarkdownText;
