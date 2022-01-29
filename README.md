# How to 

- Prerequisites : [NodeJS](https://nodejs.org/en/download/) >= 14 LTS 

- Install the Gatsby CLI
`npm install -g gatsby-cli`

- Clone the repository and run `npm install` to collect all dependencies

## Environment variables

- Test the website locally 

On the `.env` model, create `.env.development` file and fill the fields with the corresponding information
```
INTEGRATION_TOKEN=secret_notionAPI_token
DATABASE_ID=ae5354e0-d1ce-4b2a-bf3a-5396b14d206b
```

- For deployment

Netlify hosts those environment variables so you do not need to edit the `.env`  file for website deployment.

To prevent triggering a deploy on Netlify at pull request and merge on main, add [skip netlify] in the commit message ([Details](https://docs.netlify.com/site-deploys/manage-deploys/#skip-a-deploy)).

## Run locally

### Development mode

Run `gatsby develop` in a terminal to start the dev site

### Build mode

Run `gatsby build` then `gatsby serve` 

### Clean

Run `gatsby clean` 

## Data sourcing & custom plugins
Currently the project use both local file and one remote source on Notion to source data.

Custom plugins :
- **gatsby-plugin-offres-pages** : create pages from markdown files in `/src/content/offres-descriptions`
- **gatsby-plugin-md-from-csv** : create markdown node (which will then be handle by `gatsby-transformer-remark`) from description attribute in `src/data/hackaviz_participants.csv`
- **gatsby-plugin-meetup-pages-notion**: collect nodes created by `gatsby-source-notion-api` to create event pages
- **gatsby-plugin-md-from-notion-table-attribute**: create markdown node (which will then be handle by `gatsby-transformer-remark`) from description attribute in nodes created by `gatsby-source-notion-api`

# Forked from gatsby-starter-forty
https://github.com/codebushi/gatsby-starter-forty
-> Updated to Gatsby V3 in this repository

Peek
Peek