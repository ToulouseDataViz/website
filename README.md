# How to 

Install the Gatsby CLI

`npm install -g gatsby-cli`

Clone the repository and run `npm install` to collect all dependencies

Node >= 14

## Environment variables
On the `.env` model, create `.env.development` file and add the corresponding information

The website is deployed on Netlify which also host those environment variables.

To prevent triggering a deploy on Netlify at pull request and merge on main, add [skip netlify] in the commit message [see more](https://docs.netlify.com/site-deploys/manage-deploys/#skip-a-deploy)

## Run locally

### Development mode

Run `gatsby develop` in the terminal to start the dev site.

### Build mode

Run `gatsby build` then `gatsby serve` 

### Clean eventual 

Run `gatsby clean` 

## Data sourcing & Custom plugins
Currently the project use both local file and one remote source on Notion to source data.

Custom plugins :
- **gatsby-plugin-offres-pages** : create pages from markdwon files in /src/content/offres-descriptions
- **gatsby-plugin-books-pages**: create pages from csv file in /src/data/books.csv
- **gatsby-plugin-md-from-csv** : create markdwon node (which will then be handle by `gatsby-transformer-remark`) from description attribute in src/data/hackaviz_participants.csv
- **gatsby-plugin-meetup-pages-notion**: collect nodes created by `gatsby-source-notion-api` to create a page per event
- **gatsby-plugin-md-from-notion-table-attribute** :  create markdwon node (which will then be handle by `gatsby-transformer-remark`) from description attribute in nodes created by `gatsby-source-notion-api`

# Forked from gatsby-starter-forty
https://github.com/codebushi/gatsby-starter-forty
-> Updated to Gatsby V3 in this repository


