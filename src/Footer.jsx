import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){

    const handleScroll = () =>{
        window.scrollTo(0,0);
    }

    return(
        <div className="CC-C-footer_wrapper">
            <h4>Explore Crafted</h4>
            <span className="CC-C-footer_navLinks">
                <li>
                    <Link to='/random' onClick={handleScroll}>Random Cocktail Generator</Link>
                </li>
                <li>
                    <Link to='/search' onClick={handleScroll}>Search Cocktails</Link>
                </li>
                <li>
                    <a href='#' onClick={handleScroll}>Meet the author</a>
                </li>
                <li>
                    <a href='#' onClick={handleScroll}>Contact</a>
                </li>
            </span>
            <h4>Legal</h4>
            <span className="CC-C-footer_legal">
                <a href="https://www.apache.org/licenses/">License</a>
                <p>@2024 Day Blassingame</p>
            </span>
        </div>
    )
}