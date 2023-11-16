import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import query from "../queries/categories"
import baseUrl from "../config";

const CatSection = () =>{
const navigate = useNavigate();
const [state, setState] = useState(null);
const [loading, setLoading] = useState(true);

 


  useEffect(() => {
    // Function to fetch data from your GraphQL server
    const fetchData = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_GRAPHQL_URL, { query });
         const { data } = response.data; 
         setState(data.categories.data); 
        setLoading(false);
       
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  
      }
    };
    fetchData();
}, []); 

if (loading) { 
    return <div>Loading...</div>; 
}


const handlePostClick = (catId) => {
    navigate(`/category-list/${catId}`);
  };

const gk = state?.filter((gk_data) => gk_data?.attributes?.Title === 'General Knowledge') || [];
const general = gk[0]?.attributes?.posts?.data || [];


const beauty = state?.filter((b_data) => b_data?.attributes?.Title == 'Beauty Tips' ) || [] ;
const beautytips = beauty[0]?.attributes?.posts?.data || [];
const heath_tips = state?.filter((ht_data) => ht_data?.attributes?.Title == 'Health Tips' ) || [];
const health = heath_tips[0]?.attributes?.posts?.data || [];
const bolly_tadka = state?.filter((bt) => bt?.attributes?.Title == 'Bollywood Tadka' ) || [];
const bollywood = bolly_tadka[0]?.attributes?.posts?.data   || [];

    return(

        <>
        
            <div className="post-banner-area pd-top-30">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="post-slider">
                    { general.length > 0 && general.map((item, index) => {
                         if (index === 0) {
                            return(
                        <div className="item" key={index} id={index} onClick={() => handlePostClick(gk[0]?.id)}>
                            <div className="top-post-wrap top-post-wrap-4">
                                <div className="thumb">
                                    <div className="overlay"></div>
                                    <img src={`${baseUrl}${item?.attributes?.Image?.data[0]?.attributes?.url}`} alt="img12"/>
                                    <a className="tag top-right tag-red" href="blog-category.html">{item?.attributes?.categories?.data[0]?.attributes?.Title}</a>
                                </div>
                                <div className="top-post-details">
                                    <div className="meta">
                                        <div className="date">
                                            <i className="fa fa-clock-o"></i>
                                            {moment(item?.attributes?.createdAt).format('DD-MM-YYYY')}
                                        </div>
                                    </div>
                                    <h4>{item?.attributes?.Title}</h4>
                                </div>
                            </div>
                        </div>
                    )}
                    })}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-md-6">
                        { beautytips?.length > 0 &&  beautytips?.map((BT, index) => {
                         if (index === 0) {
                            return(
                            <div className="top-post-wrap top-right" key={index} id={index}  onClick={() => handlePostClick(beauty[0]?.id)}>
                                <div className="thumb">
                                    <div className="overlay"></div>
                                    <img src={`${baseUrl}${BT?.attributes?.Image?.data[0]?.attributes?.url}`} alt="img"/>
                                    <a className="tag top-right tag-sky">{BT?.attributes?.categories?.data[0]?.attributes?.Title}</a>
                                </div>
                                <div className="top-post-details">
                                    <div className="meta">
                                        <div className="date">
                                            <i className="fa fa-clock-o"></i>
                                            {moment(BT?.attributes?.createdAt).format('DD-MM-YYYY')}
                                        </div>
                                    </div>
                                    <h6>
                                        {BT?.attributes?.Title}</h6>
                                </div>
                            </div>
                        )}
                        })}
                        </div>
                        <div className="col-md-6">
                        { health?.length>0 && health?.map((HT, index) => {
                         if (index === 0) {
                            return(
                            <div className="top-post-wrap top-right"  key={index} id={index} onClick={() => handlePostClick(heath_tips[0]?.id)}>
                                <div className="thumb">
                                    <div className="overlay"></div>
                                    <img src={`${baseUrl}${HT?.attributes?.Image?.data[0]?.attributes?.url}`}  alt="img"/>
                                    <a className="tag top-right tag-purple" href="blog-category.html">{HT?.attributes?.categories?.data[0]?.attributes?.Title}</a>
                                </div>
                                <div className="top-post-details">
                                    <div className="meta">
                                        <div className="date">
                                            <i className="fa fa-clock-o"></i>
                                            {moment(HT?.attributes?.createdAt).format('DD-MM-YYYY')}
                                        </div>
                                    </div>
                                    <h6><a href="blog-category.html">{HT?.attributes?.Title}</a></h6>
                                </div>
                            </div>
                            )}
                        })}
                        </div>
                    </div>
                    {bollywood.length>0 && bollywood.map((BW, index) => {
                        if (index === 0) {
                        return(
                    <div className="top-post-wrap bottom-right"  key={index} id={index} onClick={() => handlePostClick(bolly_tadka[0]?.id)}>
                        <div className="thumb">
                            <div className="overlay"></div>
                            <img src={`${baseUrl}${BW?.attributes?.Image?.data[0]?.attributes?.url}`} alt="img"/>
                            <a className="tag top-right tag-pink" href="blog-category.html">{BW?.attributes?.categories?.data[0]?.attributes?.Title}</a>
                        </div>
                        <div className="top-post-details top-post-details-2">
                            <div className="meta">
                                <div className="date">
                                    <i className="fa fa-clock-o"></i>
                                        {moment(BW?.attributes?.createdAt).format('DD-MM-YYYY')}
                                </div>
                            </div>
                            <h6><a href="blog-category.html">{BW?.attributes?.Title}</a></h6>
                        </div>
                    </div>
                    )}
                    })}
                </div>
            </div>
        </div>
    </div>


        </>
    );
}
export default CatSection