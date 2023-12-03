import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Helmet from 'react-helmet';
import Layout from './layout';

import { GatsbyImage } from 'gatsby-plugin-image';

import { Box } from '@material-ui/core';

import useSponsors from '../hooks/useSponsors';
import usePics from '../hooks/usePics';
import MarkdownText from './MarkdownText';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        width: 150,
        height: 80,
        margin: "20px 0px",
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gatsbyImageCentered: {
        verticalAlign: 'middle',
    },

    paddingTop: { paddingTop: '20px' },

    meetupnavitem: {
        margin: theme.spacing(1, 0),
    },
    description: {
        margin: theme.spacing(3, 0),
    },
    griditemmargin: {
        margin: theme.spacing(0, 2, 0, 0),
    },
}));

export const Sponsor = ({ id }) => {

    const classes = useStyles();
    const sponsors = useSponsors().filter(({ inactive }) => !inactive).sort((a, b) => a.rank - b.rank);

    const sponsor = sponsors.find(sponsor => sponsor.pic_name === id)
    if (sponsor===undefined) {
        return <div>Sponsor non trouvé !</div>
    }
    const sponsorsPics = usePics().filter(({ relativeDirectory }) => relativeDirectory === 'sponsor-pics');
    const getPic = myName => sponsorsPics.find(({ name }) => myName === name)?.gatsbyImageData;

    const renderSponsor = (sponsor) => {

        const sponsorPic = getPic(sponsor.pic_name);
        const markdownDescription = sponsor.children[0]?.childMarkdownRemark?.htmlAst;
        return (
            <React.Fragment key={sponsor.pic_name}>

                <div style={{ display: "flex", flexDirection: "row-reverse", gap: "20px" }}>
                    <div style={{ width: "150px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {sponsorPic && (
                            <Box className={classes.imageContainer}>
                                <a href={sponsor.link} target="_blank" rel="noreferrer">
                                    <GatsbyImage className={classes.gatsbyImageCentered} image={sponsorPic} alt={sponsor.pic_name} />
                                </a>
                            </Box>
                        )}


                        <a href={sponsor.link} target="_blank" rel="noreferrer">
                            {sponsor.name}
                        </a>
                    </div>
                    <div>
                        {markdownDescription && (
                            <MarkdownText hast={markdownDescription} />
                        )}
                    </div>

                </div>

            </React.Fragment>
        );
    }
    return (
        <Layout>
            <Helmet>
                <title>Sponsor {sponsor.name}</title>
                <meta name="description" content="Generic Page" />
            </Helmet>

            <div id="main" className="alt">
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h3>{sponsor.name}</h3>
                        </header>
                        {renderSponsor(sponsor)}
                    </div>
                </section>
            </div>
        </Layout>
    );
};