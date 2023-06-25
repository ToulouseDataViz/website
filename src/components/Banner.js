import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import { Grid } from '@material-ui/core';

import useSiteMetadata from '../hooks/useSiteMetadata';

const Banner = () => {
	const { headline, description, actionButton } = useSiteMetadata();

	return (
		<section id="banner" className="major">
			<div className="inner">
				<header className="major">
					<Grid container alignItems="center" justify="space-between">
						<h1>{headline}</h1>
						<StaticImage
							src={'../assets/images/logo.png'} alt=""
							height={75} width={75} objectFit={'scale-down'}
							transformOptions={ { rotate: 180 } }
						/>
					</ Grid>
				</header>
				<div className="content">
					<p>{description}</p>
				</div>
			</div>
		</section>
	)
}

export default Banner
