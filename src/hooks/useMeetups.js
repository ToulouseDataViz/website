import { graphql, useStaticQuery } from 'gatsby';

export const useMeetups = () => {
  const { allEventsCsv: { nodes } } = useStaticQuery(graphql`
    query {
      allEventsCsv {
        nodes {
          meetupid
          year
          videoLink
          title
          place
          month
          meetupLink
          day
          day
          fields {
            Markdown {
              htmlAst
            }
          }
        }
      }
    }
  `);

  return nodes.map(meetup => ({
    meetupid: parseInt(meetup.meetupid),
    ...meetup
  }));
};

export default useMeetups;