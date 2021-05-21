import React from 'react'
import { Link } from 'gatsby'

import useHomeContent from '../hooks/useHomeContent'

const Menu = ({ onToggleMenu }) => {
  const homeContentCsv = useHomeContent();
  
  return (
    <nav id="menu">
      <div className="inner">
        <ul className="links">
          <li><Link onClick={onToggleMenu} to={"/"}>Home</Link></li>
          {homeContentCsv.map(({ title, slug, isInMenu }, index) => {
            if (isInMenu === 'true') {
              return (
                <li key={`menu-li-${index}`}>
                  <Link onClick={onToggleMenu} to={slug}>{title}</Link>
                </li>
              );
            } 
            else {
              return (<></>);
            }
          })}
        </ul>
      </div>
      <a role="link" tabIndex={0} className="close" onClick={onToggleMenu}>Close</a>
    </nav>
  )
}

export default Menu
