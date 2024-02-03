import React from "react";

export default function Footer(){

    return(
        <div className="p-C-footer_wrapper">
            <h4>Explore Crafted</h4>
            <span className="p-C-footer_navLinks">
                <a>Discover</a>
                <a>Search Cocktails</a>
                <a>Meet the author</a>
                <a>Contact</a>
            </span>
            <h4>Legal</h4>
            <span className="p-C-footer_legal">
                <a href="https://www.apache.org/licenses/">License</a>
                <p>@2024 Day Blassingame</p>
            </span>
            
        </div>
    )
}