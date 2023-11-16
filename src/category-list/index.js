import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../header"; 
import { useNavigate } from 'react-router-dom';
import query from "../queries/catgory-by-id";
import baseUrl from "../config";
import Footer from "../footer";



const CategoryList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const[title,setTitle] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(process.env.REACT_APP_GRAPHQL_URL, {
              query,
              variables: {
                categoryId: id,
              },
            });
    
            const responseData = response.data.data;
            const Title = responseData.category.data.attributes.Title;
            setTitle(Title);
            setPost(responseData?.category?.data?.attributes?.posts);
            // console.log("title", Title); 
            
    
            setLoading(false); 
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
        fetchData();
      }, [id]);


     



      if (loading) {
        return <div>Loading...</div>; 
      } 
      const handlePostClick = (postId) => {
        navigate(`/post-details/${postId}`);
        // console.log(postId,"postId")
      };

    return (
        <div>
            <Header /> 
            <div className="container pt-5 pb-5">
            <h2>{title}</h2>
            <ul className="category_list">
              {post?.data?.map((item,key) =>{
               
                return(
                    <li onClick={() => handlePostClick(item.id)} key={key}>
                         <img src={`${baseUrl}${item?.attributes?.Image?.data[0]?.attributes?.url}`} alt="img123"/>
                        <h6>{item?.attributes?.Title}</h6>
                    </li>
                )

              })} 
              </ul>
              </div>
              <Footer/>
        </div> 
    );
    }



export default CategoryList;