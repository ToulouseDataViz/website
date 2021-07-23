import { graphql, useStaticQuery } from 'gatsby';

export const useMeetupsNotion = () => {
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
            day {
              value
            }
            year {
              value
            }
            videoLink {
              value
            }
            place {
              value
            }
            month {
              value
            }
            meetupid {
              value
            }
            meetupLink {
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
    day: properties.day?.value,
    month: properties.month?.value,
    year: properties.year?.value,
    meetupLink: properties.meetupLink?.value,
    videoLink: properties.videoLink?.value,
    database_id: raw.parent?.database_id,
  }));
  // sort TBD
};

export default useMeetupsNotion;