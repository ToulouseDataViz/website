import React, { useState, useEffect } from 'react'

import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

const Layout = ({location, hideFooter, children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [loading, setLoading] = useState('is-loading');
  const currentPathname = location?.pathname;
  useEffect(() => {
    setLoading('');
  }, []);

  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  }
  const noSponsorPathnames = ["/sponsors", "/", ""]
  const enableSponsors = () => {
    const doesIncludes = noSponsorPathnames.includes(currentPathname)
    if (doesIncludes) {
      return true;
    }
    return currentPathname?.startsWith("/sponsor/");
  }

  return (
    <div className={`body ${loading} ${isMenuVisible ? 'is-menu-visible' : ''}`}>

      <div id="wrapper">
        <Header onToggleMenu={handleToggleMenu} />
        {children}
        {!hideFooter && <Footer hideSponsors={enableSponsors()} />}
      </div>
      <Menu onToggleMenu={handleToggleMenu} />
    </div>
  )
}

export default Layout
