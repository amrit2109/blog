import React from "react";
import { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { useNavigate } from 'react-router-dom';
import baseUrl from "../config";
import moment from 'moment';
import { getCategorybyId } from "../api-services/category";
import { category_id } from "../queries/category";



const TopTranding = ({ categoryId }) => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    
  
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getCategorybyId(category_id, categoryId) ;  
          const responseData = response?.data?.data;
          if (responseData && responseData?.category && responseData?.category?.data) {
            setPost(responseData?.category?.data?.attributes?.posts?.data);
            console.log(post,"post");
          } else { 
          }
  
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }, [categoryId]);
  
    if (loading) {
      return <div>Loading...</div>; 
    }
  
    const handlePostClick = (postId) => {
        navigate(`/post-details/${postId}`);
      };


    return (
        <div className="top-news-area pd-top-30 pd-bottom-40">
        <div className="container">
            <div className="section-title">
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="title"> {post[0]?.attributes?.categories?.data[0]?.attributes?.Title}</h4>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="recent-post-slider ">
                        <div className="">
                        <OwlCarousel items={3} className="owl-theme" loop margin={8} >   
                        {post?.map((item, index) => {                
                            return (
                                <div className="top-post-wrap item" key={index} onClick={() => handlePostClick(item?.id)}>
                               
                                <div className="thumb">
                                    <div className="overlay"></div>
                                    <img src={`${baseUrl}${item?.attributes?.Image?.data[0]?.attributes?.url}`} alt="img12"/>
                                         <a className="tag top-right tag-sky" href="blog-category.html">
                                    {item?.attributes?.categories?.data[0]?.attributes?.Title}
                                    </a>
                                </div>
                                <div className="top-post-details">
                                    <div className="meta">
                                    <div className="date">
                                        <i className="fa fa-clock-o"></i>
                                        {moment(item?.attributes?.createdAt).format('DD-MM-YYYY')}
                                    </div>
                                    </div>
                                    <h6>{item?.attributes?.Title}</h6>
                                </div>
                                </div>
                            );
                            })}
                         </OwlCarousel>  
                      

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>







    
    );
  };
  
  

export default TopTranding;