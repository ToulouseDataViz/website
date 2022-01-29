import React from 'react';
import Button from './Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  rightGroup: {
    marginLeft: 'auto',
  },
});

const HackavizHeader = ({ year }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>
        <Button link={`/hackaviz/${year}-contest`} type={'internal'} text={'Le concours'} />
        <Button link={`/hackaviz/${year}-data`} type={'internal'} text={'Les données'} />
      </span>
      <span className={classes.rightGroup}>
        <Button link={'/hackaviz/apropos'} type={'internal'} text={'A propos'} />
      </span>
    </div>
  );
};

export default HackavizHeader;
