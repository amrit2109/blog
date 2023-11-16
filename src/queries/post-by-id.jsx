
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POST_QUERY = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          Title
          Tags
          Description
          Image {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              attributes {
                Title
              }
            }
          }
          comments {
            data {
              attributes {
                Name
                CommentBody
              }
            }
          }
        }
      }
    }
  }
`;


export default GET_POST_QUERY;