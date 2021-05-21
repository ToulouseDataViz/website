import React, { useState, useEffect } from 'react'

import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

const Layout = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [loading, setLoading] = useState('is-loading');

  useEffect(() => { 
    setLoading('');
  }, []);

  const handleToggleMenu = () => {
      setIsMenuVisible(!isMenuVisible);
  }

  return (
      <div className={`body ${loading} ${isMenuVisible ? 'is-menu-visible' : ''}`}>
          <div id="wrapper">
              <Header onToggleMenu={handleToggleMenu} />
              {children}
              <Footer />
          </div>
          <Menu onToggleMenu={handleToggleMenu} />
      </div>
  )
}

export default Layout
