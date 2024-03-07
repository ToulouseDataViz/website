require('dotenv').config({
  path: `.env.development`, //${process.env.NODE_ENV}
});

module.exports = {
  siteMetadata: {
    headerTitle: 'Toulouse DataViz',
    headerSubtitle: 'Bienvenue !',
    headline: 'Toulouse DataViz',
    description:
      'Notre but ? Promouvoir et diffuser la culture de l’analyse et de la visualisation des données. Découvrez comment ',
    actionButton: "Découvrir l'association",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `offres-description`,
        path: `${__dirname}/src/content/offres-description`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/MDXPageLayout.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gallery`,
        path: `${__dirname}/src/content/pics/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `site-images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: 'gatsby-source-notion',
      options: {
        token: process.env.INTEGRATION_TOKEN,
        databases: process.env.DATABASE_ID.split(','),
        previewCallRate: 0,
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://raw.githubusercontent.com/ToulouseDataViz/Hackaviz2021/main/README.md',
        name: 'hackaviz21_description',
        ext: '.md',
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://raw.githubusercontent.com/ToulouseDataViz/Hackaviz2022/main/README.md',
        name: 'hackaviz22_description',
        ext: '.md',
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://raw.githubusercontent.com/ToulouseDataViz/Hackaviz2023/main/README.md',
        name: 'hackaviz23_description',
        ext: '.md',
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://raw.githubusercontent.com/Toulouse-Dataviz/hackaviz-2024/main/README.md',
        name: 'hackaviz24_description',
        ext: '.md',
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-offres-pages`,
    {
      resolve: 'gatsby-plugin-md-from-csv',
      options: {
        nodeTypes: ['HackavizParticipantsCsv', 'SponsorsCsv'],
      },
    },
    `gatsby-plugin-md-from-notion-table-attribute`,
    `gatsby-plugin-meetup-pages-notion`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/public/**/*.html': ['cache-control: public', 'cache-control:  max-age=0', 'cache-control: must-revalidate'],
          '/sw.js': ['cache-control: public', 'cache-control:  max-age=0', 'cache-control: must-revalidate'],
          '/public/page-data/*': [
            'cache-control: public',
            'cache-control: max-age=0',
            'cache-control: must-revalidate',
          ],
        },
      },
    },
  ],
};
