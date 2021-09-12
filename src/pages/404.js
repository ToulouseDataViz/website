import React from 'react'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <div id="main" className="alt">
      <section id="one">
        <div className="inner">
          <h1>Page non trouvée !</h1>
          <p>¯\_(ツ)_/¯</p>
          <p>Retourner à la <a href="/">page d'accueil</a> de Toulouse DataViz.</p>
        </div>
      </section>
    </div>
  </Layout>
)

export default NotFoundPage
