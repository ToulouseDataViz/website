import { graphql, useStaticQuery } from 'gatsby';

function notionRichTextToString(notionProperty) {
  return notionProperty?.rich_text?.map(({ plain_text }) => plain_text).join('');
}
export const useEventsNotion = () => {
  const {
    allNotionDatabase: { nodes },
  } = useStaticQuery(graphql`
    query {
      allNotionDatabase(filter: { title: { eq: "meetups_full" } }) {
        nodes {
          childrenNotionPage {
            title
            childrenMarkdownDescriptionFromNotion {
              childrenMarkdownRemark {
                htmlAst
              }
            }
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
                  plain_text
                }
              }
              description {
                rich_text {
                  plain_text
                }
              }
              videoLink {
                url
              }
              PresLink {
                url
              }
              PresLink2 {
                url
              }
              PresLink3 {
                url
              }
              VignetteLink {
                rich_text {
                  plain_text
                }
              }
              presentateurs {
                rich_text {
                  plain_text
                }
              }
            }
            childMarkdownDescriptionFromNotion {
              childrenMarkdownRemark {
                htmlAst
              }
            }
          }
        }
      }
    }
  `);

  const [{ childrenNotionPage }] = nodes;

  return childrenNotionPage.map(({ title, childrenMarkdownDescriptionFromNotion, properties }) => ({
    meetupid: properties.meetupid?.number,
    title,
    status: properties.Status?.select?.name,
    descriptionRawString: notionRichTextToString(properties.description),
    descriptionHtmlAst: childrenMarkdownDescriptionFromNotion[0]?.childrenMarkdownRemark[0]?.htmlAst,
    date: properties.Date?.date?.start,
    meetupLink: properties.meetupLink?.url,
    videoLink: properties.videoLink?.url,
    place: notionRichTextToString(properties.place),
    presLinks: [properties.PresLink, properties.PresLink2, properties.PresLink3],
    vignetteLink: properties.VignetteLink,
    lecturers: notionRichTextToString(properties.presentateurs),
  }));
};

export default useEventsNotion;
