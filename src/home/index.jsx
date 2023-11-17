import React from "react";
import "../assets/css/vendor.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Header from "../header";
import CatSection from "../firstSection";
import TopTranding from "../top-tranding";
import Footer from "../footer";


const Home = () =>{
    return(
        <>        
            <Header/>
            <CatSection/>
            <TopTranding categoryId="3" /> 
            <TopTranding categoryId="4" /> 
            <TopTranding categoryId="2" /> 
            <TopTranding categoryId="5" /> 
            <Footer/>
        </>
    );
}

export default Home;


