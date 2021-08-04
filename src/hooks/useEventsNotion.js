import { graphql, useStaticQuery } from 'gatsby';

export const useEventsNotion = () => {
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
  // sort TBD
};

export default useEventsNotion;