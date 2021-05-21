import React from 'react'
import useSiteMetadata from '../hooks/useSiteMetadata'

const Banner = () => {
	const { headline, description, actionButton } = useSiteMetadata();

	return (
		<section id="banner" className="major">
			<div className="inner">
				<header className="major">
					<h1>{headline}</h1>
				</header>
				<div className="content">
					<p>{description}</p>
				</div>
				<div>				
					<ul className="actions">
					<li><a href="#one" className="button next scrolly">{actionButton}</a></li>
				</ul>
				</div>
			</div>
		</section>
	)
}

export default Banner
