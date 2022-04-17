import React from 'react';
import { Link } from 'gatsby';

import useHomeContent from '../hooks/useHomeContent';

const Menu = ({ onToggleMenu }) => {
  const homeContentCsv = useHomeContent();

  return (
    <nav id="menu">
      <div className="inner">
        <ul className="links">
          <li>
            <Link onClick={onToggleMenu} to={'/'}>
              Accueil
            </Link>
          </li>
          {homeContentCsv.map(({ title, slug, isInMenu }, index) => {
            if (isInMenu === 'true') {
              const linkContent = slug.startsWith('/') ? (
                <Link onClick={onToggleMenu} to={slug}>
                  {title}
                </Link>
              ) : (
                <a href={slug}>{title}</a>
              );
              return <li key={`menu-li-${index}`}>{linkContent}</li>;
            } else {
              return <></>;
            }
          })}
        </ul>
      </div>
      <a role="link" tabIndex={0} className="close" onClick={onToggleMenu} onKeyDown={onToggleMenu}>
        Close
      </a>
    </nav>
  );
};

export default Menu;
