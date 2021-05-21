import React from 'react'

const Footer = () => (
  <footer id="footer">
    <div className="inner">
        <section>
          <ul className="icons">
            <li><a href="mailto:contact@toulouse-dataviz.fr" className="icon alt fa-envelope"><span className="label">Mail</span></a></li>
            <li><a href="https://twitter.com/tls_dataviz?lang=fr" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="https://toulouse-hackaviz.slack.com/messages/CGZEG3RPB/" className="icon alt fa-slack"><span className="label">Slack</span></a></li>
            <li><a href="https://www.youtube.com/channel/UCo64gnxLZs1xIN-Y0Bv_Hpg/about" className="icon alt fa-youtube"><span className="label">Youtube</span></a></li>
          </ul>
          <ul className="copyright">
            <li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            <li>Template Gatsby: <a href="https://www.gatsbyjs.com/starters/codebushi/gatsby-starter-forty">Forty</a></li>
          </ul>
        </section>
    </div>
  </footer>
)

export default Footer
