import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

import useMembers from '../hooks/useMembers';
import usePics from '../hooks/usePics';

import Button from '../components/Button';
import { getPic } from '../helper';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    width: 200,
  },
  image: {
    height: theme.spacing(25),
  },
  linkicon: {
    margin: theme.spacing(1,0),
  }
}));

const Members = () => {
  const classes = useStyles();

  const members = useMembers();
  const teamPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'team-pics');
  
  return (
    <Grid container>
      {members.map(({ nom, pic_name, nom_site, lien_site, linkedin, twitter }) => {
        const memberPic = getPic(teamPics, pic_name);

        return (
          <React.Fragment key={nom}> 
            <Grid item xs={12} sm={4} >
              <Grid container 
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <h5>{nom}</h5>
                </Grid>
                <Grid item>
                  { memberPic && ( 
                    <Box className={classes.imageContainer}>
                      <GatsbyImage className={classes.image} image={memberPic} alt={pic_name}/>
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  { lien_site 
                    ? (<Button
                        link={lien_site}
                        text={nom_site}
                        size={'small'}
                      />)
                    : (<span>{nom_site}</span>)
                  }
                </Grid>
                <Box className={classes.linkicon}>
                  <ul className="icons">
                    { twitter && (
                      <li><a href={twitter} target="_blank" rel="noreferrer" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
                    )}
                    { linkedin && (
                      <li><a href={linkedin} target="_blank" rel="noreferrer" className="icon alt fa-linkedin"><span className="label">Linkedin</span></a></li>
                    )}
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </React.Fragment>
        )
      })}
    </Grid>
  );
}

export default Members
