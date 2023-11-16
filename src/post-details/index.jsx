import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from '@apollo/client';
import Header from "../header";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import CommentForm from "../comment-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import query from "../queries/categories";
import GET_POST_QUERY from "../queries/post-by-id"
import baseUrl from "../config";
import Footer from "../footer";


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

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();



  const [category, setCategory] = useState([]);

  useEffect(() => {
    const catData = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_GRAPHQL_URL, { query });
        const responseData = response?.data?.data?.categories?.data;
        setCategory(responseData);  
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    catData();
}, []); 


  const { loading, error, data, refetch } = useQuery(GET_POST_QUERY, {
    variables: { id },
  });

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update(cache, { data: { createComment } }) {
      const newComment = createComment.data.attributes;
      cache.modify({
        id: cache.identify(data.post),
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: newComment,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  attributes {
                    Name
                    CommentBody
                  }
                }
              `
            });
            return [...existingComments, newCommentRef];
          }
        }
      });
    }
  });

  const handleCommentSubmit = (newComment) => {
    // Update the comments only if it doesn't exist in the current comments list
    const commentExists = post?.comments?.data?.some(
      (comment) => comment?.attributes?.id === newComment?.id
    );
    refetch();
    if (!commentExists) {
      refetch(); // Refetch the post and comments data to get the latest updates
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePostClick = (catId) => {
    navigate(`/category-list/${catId}`);
    // console.log(postId,"postId")
  };

  const post = data.post.data.attributes;
  const postTags = post?.Tags;
  const words = postTags?.split(',');
 
   

  const postUrl = "https://www.google.com/";

  return (
    <>
      <Header />
      <div className="postDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {post?.Image && post?.Image?.data && post?.Image?.data[0] && (
                <img src={`${baseUrl}${post?.Image?.data[0]?.attributes?.url}`} alt="img" />
              )}
              {post?.categories && post?.categories?.data && post?.categories?.data[0] && (
                <span className="tag top-right tag-pink mt-3 mb-3">
                  {post?.categories?.data[0]?.attributes?.Title}
                </span>
              )}
              <h3>{post?.Title}</h3>
             
              <p>{post?.Description}</p>
              <ul className="tags_details">
                {words?.map((item, id) => {
                  return (
                    <li key={id}>
                      <span className="tag tag-pink">{item}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="socal_share">
                {/* Facebook share button */}
                <FacebookShareButton url={postUrl} className="tag top-right tag-pink mt-3 mb-3">
                  Share on Facebook
                </FacebookShareButton>

                {/* Twitter share button */}
                <TwitterShareButton url={postUrl} className="tag top-right tag-pink mt-3 mb-3">
                  Share on Twitter
                </TwitterShareButton>

                {/* Rest of the post details */}
                {/* ... */}
              </div>
              <div className="comments"> 
                <h3>Comments</h3>
                <ul>
                  {post?.comments?.data?.map((comment) => (
                    <li key={comment?.attributes?.Name}>
                      <p>{comment?.attributes?.CommentBody}</p> 
                      <h4>{comment?.attributes?.Name}</h4>
                    </li>
                  ))}
                </ul> 
              </div>
              <CommentForm updateComments={handleCommentSubmit} comments={post?.comments?.data} />
     </div>
            <div className="col-md-3">
              <h3>Categories</h3>
              <ul className="category_UL">                
              {category?.map((item,id) =>{
                let catId = item.id;
                return(
                  <li key={id} onClick={() => handlePostClick(catId)}>
                    {item?.attributes?.Title} 
                    ({item?.attributes?.posts?.data?.length})
                  </li>
                )
              })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PostDetails;
