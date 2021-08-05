import { graphql, useStaticQuery } from 'gatsby';

export const useEventsNotion = () => {
  const { allNotionDatabase: { nodes } } = useStaticQuery(graphql`
    query { 
      allNotionDatabase(filter: {title: {eq: "meetups_full"}}) {
        nodes {
          childrenNotionPage {
            properties {
              Date {
                date {
                  start
                }
              }
              Status {
                select {
                  name
                }
              }
              meetupLink {
                url
              }
              meetupid {
                number
              }
              place {
                rich_text {
                  text {
                    content
                  }
                }
              }
              title {
                title {
                  text {
                    content
                  }
                }
              }
              videoLink {
                url
              }
            }
            childrenMarkdownRemark {
              frontmatter {
                description
              }
              childrenMarkdwonDescriptionFromNotion {
                childMarkdownRemark {
                  htmlAst
                }
              }
            }
          }
        }
      }
    }
  `);

  const [{ childrenNotionPage }] = nodes;

  return childrenNotionPage.map(({ properties, childrenMarkdownRemark }) => ({
    meetupid: properties.meetupid?.number,
    title: properties.title?.title[0]?.text?.content,
    status: properties.Status?.select?.name,
    descriptionMarkdownString: childrenMarkdownRemark[0]?.frontmatter?.description,
    descriptionHtmlAst: childrenMarkdownRemark[0]?.childrenMarkdwonDescriptionFromNotion[0]?.childMarkdownRemark?.htmlAst,
    date: properties.Date?.date?.start,
    meetupLink: properties.meetupLink?.url,
    videoLink: properties.videoLink?.url,
  }));
  /*
  const { allNotion: { nodes } } = useStaticQuery(graphql`
    query { 
      allNotion {
        nodes {
          id
          properties {
            Status {
              value {
                name
              }
            }
            videoLink {
              value
            }
            place {
              value
            }
            Date {
              value {
                start
              }
            }
            meetupid {
              value
            }
            meetupLink {
              value
            }
            description {
              value
            }
          }
          title
          childrenMarkdwonDescriptionFromNotion {
            childrenMarkdownRemark {
              htmlAst
            }
          }
          raw {
            parent {
              database_id
            }
          }
        }
      }
    }
  `);

  return nodes.map(({ properties, title, childrenMarkdwonDescriptionFromNotion, raw }) => ({
    meetupid: properties.meetupid?.value,
    title,
    status: properties.Status?.value?.name,
    descriptionHtmlAst: childrenMarkdwonDescriptionFromNotion[0]?.childrenMarkdownRemark[0]?.htmlAst,
    descriptionMarkdownString: properties.description?.value,
    date: properties.Date?.value?.start,
    meetupLink: properties.meetupLink?.value,
    videoLink: properties.videoLink?.value,
    database_id: raw.parent?.database_id,
  }));
  */
};

export default useEventsNotion;