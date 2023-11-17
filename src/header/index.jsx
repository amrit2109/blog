import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest'; // Import the library
import Logo from "../assets/images/dummy-logo.png";
import { query } from "../queries/post";
import { getAllCategories } from "../api-services/category";
import { CATEGORY_TITLE } from "../queries/category";



const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Add suggestions state
  const[catid,setCatid] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories({ query });
        setData(response.data.data.posts.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (data) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = data.filter((item) =>
        item?.attributes?.Title?.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredData(filtered);
    }
  };

  // Implement the getSuggestions function to return filtered suggestions
  const getSuggestions = (value) => {
    const lowercaseQuery = value.toLowerCase();
    return data.filter((item) =>
      item.attributes.Title.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Implement the onSuggestionsFetchRequested function
  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
  };

  // Implement the onSuggestionsClearRequested function
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search Post here...",
    value: searchQuery,
    onChange: (e, { newValue }) => setSearchQuery(newValue),
  };

  const handleSuggestionClick = (suggestion) => {
    // Assuming `suggestion` has an `id` property representing the post ID
    navigate(`/post-details/${suggestion.id}`);
  };
  const renderSuggestion = (suggestion) => (
    <div
      onClick={() => handleSuggestionClick(suggestion)}
      style={{ cursor: "pointer" }}
    >
      {suggestion?.attributes?.Title}
    </div>
  );




/* Get Categories */
useEffect(() => {
  const getcatId = async () => {
    try {
      const response1 = await getAllCategories({ query: CATEGORY_TITLE });
      setCatid(response1.data.data.categories.data)

    } catch (error) {
      console.error("Error fetching data category id:", error);
    }
  };
  getcatId();
}, [CATEGORY_TITLE]); 



  return (
    <>
            <>
    <div className="search-popup" id="search-popup">
        <form action="home.html" className="search-form">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search....."/>
            </div>
            {/* <button type="submit" className="submit-btn"><i className="fa fa-search"></i></button> */}
        </form>
    </div>
 
    <div className="body-overlay" id="body-overlay"></div>

    


    <div className="adbar-area d-none d-lg-block pd-top-10 pd-bottom-10" style={{backgroundColor: "#F1F4FF"}}>
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-md-right text-left">
                    <a href="/" className="adbar-right">
                        <img src={Logo} alt="img" style={{width: "100px"}}/>
                    </a>
                </div>
                <div className="col-md-6 align-self-center d-flex justify-content-end">
                    <ul className="social-area d-flex">
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-whatsapp"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        <li className="user ms-auto"><a href="#"><i className="fa fa-user"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

  
    <div className="navbar-area">
        <nav className="navbar navbar-expand-lg">
            <div className="container nav-container">
                <div className="responsive-mobile-menu">
                    <div className="logo d-lg-none d-block">
                        <a className="main-logo" href="home.html"><img src="assets/img/logo.png" alt="img"/></a>
                    </div>
                    <button className="menu toggle-btn d-block d-lg-none" data-target="#miralax_main_menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-left"></span>
                        <span className="icon-right"></span>
                    </button>
                </div>
                <div className="nav-right-part nav-right-part-mobile">
                    <a className="cart-header" href="#"><img src="assets/img/icon/cart.png" alt="img"/><span>5</span></a>
                    <a className="search header-search" href="#"><i className="fa fa-search"></i></a>
                </div>
                <div className="collapse navbar-collapse" id="miralax_main_menu">
        
                    <ul className="navbar-nav menu-open"> 
                        <li><Link to={"/"}>Home</Link></li>    
                        {catid?.map((item,id) =>{
                          return(
                            <li key={id}><Link to={`/category-list/${item?.id}`}>{item?.attributes?.Title}</Link></li>
                          )
                          
                        })}                                                           
                      
                           
                    </ul>
                </div>
                <div className="nav-right-part nav-right-part-desktop">
                <div className="d-flex">
                <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.attributes.Title}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button onClick={handleSearch}>Search</button>
                </div>
                </div>
            </div>
        </nav>
    </div>
        </>
    
    </>
  );
};

export default Header;
