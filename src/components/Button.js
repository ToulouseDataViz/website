import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer",
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 2, 1, 0),
  }
}));

const Button = ({ link, text, size = "medium", type = 'external' }) => {
  const classes = useStyles();
  const linkProps = type === "external"
   ? externalLinkProps
   : null;

  return (
    <a 
      href={link}
      className={clsx(["button"],[size],[classes.button])}
      { ...linkProps} 
    >
      {text}
    </a>
  );
}

export default Button
