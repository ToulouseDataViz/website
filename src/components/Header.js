import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import useSiteMetadata from '../hooks/useSiteMetadata';

const Header = ({ onToggleMenu }) => {
  const { headerTitle, headerSubtitle } = useSiteMetadata();
  return (
    <header id="header" className="alt">
      <StaticImage src={'../assets/images/logo.png'} alt="" height={50} width={50} objectFit={'scale-down'} />
      <Link to="/" className="logo">
        <strong>{headerTitle}</strong> 
        <span>{headerSubtitle}</span>
      </Link>
      <nav>
        <a role="link" tabIndex={0} className="menu-link" onClick={onToggleMenu} onKeyDown={onToggleMenu}>
          Menu
        </a>
      </nav>
    </header>
  );
};

export default Header;
