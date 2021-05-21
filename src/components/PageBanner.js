import React from 'react'

const PageBanner = ({ styleId, title, description }) => (
  <section id="banner" className={`style${styleId}`}>
    <div className="inner">
      <header className="major">
        <h1>{title}</h1>
      </header>
      <div className="content">
        {description}
      </div>
    </div>
  </section>
)

export default PageBanner
