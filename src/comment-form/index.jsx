import React, { useState } from "react";
// ... (other imports)

import { gql, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";

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

const CommentForm = ({ updateComments }) => {
  const { id } = useParams();
  const [state, setState] = useState({ comnt: '', Uname: '' });
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  const valueHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          name: state.Uname,
          cmtBody: state.comnt,
          postid : id,
        },
      });
      if (data && data.createComment && data.createComment.data && data.createComment.data.attributes) {
        const newComment = data.createComment.data.attributes;
        // Do not call onCommentSubmit here
        // Call the callback to update comments in the parent component
        updateComments(newComment);
        setState({ comnt: '', Uname: '' }); // Clear the form state
      } else {
        console.error("Invalid response from the server:", data);
      }
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  return (
    <>
      <h5>Your Comment</h5>
      {state.Uname === "" && state.comnt === "" ? (
        <form className="comment_form">
          <textarea
            value={state.comnt}
            name="comnt"
            onChange={valueHandle}
            placeholder="Your Comment"
          ></textarea>
          <input
            value={state.Uname}
            name="Uname"
            onChange={valueHandle}
            type="text"
            placeholder="Name"
          />
          <button className="tag top-right tag-red disable"  type="submit">
            Submit
          </button>
        </form>
      ) : (
        <form className="comment_form" onSubmit={handleSubmit}>
          <textarea
            value={state.comnt}
            name="comnt"
            onChange={valueHandle}
            placeholder="Your Comment"
          ></textarea>
          <input
            value={state.Uname}
            name="Uname"
            onChange={valueHandle}
            type="text"
            placeholder="Name"
          />
          <button className="tag top-right tag-red" type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default CommentForm;
