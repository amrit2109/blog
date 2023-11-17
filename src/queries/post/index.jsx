
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

const ADD_COMMENT_MUTATION = gql`
  mutation addComment($name: String, $cmtBody: String, $postid: ID!) {
    createComment(
      data: {
        Name: $name
        CommentBody: $cmtBody
        post: $postid
      }
    ) {
      data {
        id
        attributes {
          Name
          CommentBody
        }
      }
    }
  }
`;


const CREATE_USER_MUTATION = gql`
  mutation addComment($name: String, $cmtBody: String, $postid: ID!) {
    createComment(data: {
      Name: $name,
      CommentBody: $cmtBody,
      post: $postid
    }) {
      data {
        id
        attributes {
          Name
          CommentBody
          post{
            data{
              id
            }
          }
        }
      }
    }
  }
`;

const query = `
  query {
    posts {
      data {
        id
        attributes {
          Title
          categories {
            data {
              attributes {
                Title
              }
              id
            }
          }
        }
      }
    }
  }
`;


export {GET_POST_QUERY, ADD_COMMENT_MUTATION, CREATE_USER_MUTATION, query};