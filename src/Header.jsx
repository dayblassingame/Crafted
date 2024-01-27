import React from "react";
import Logo from './images/craftedlogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header(){

    return(
        <header>
             <span className="CC-C-logo_span ">
                <a href="#"><img src={Logo} alt="Logo" className="CC-C-logo_img"/></a>
            </span>
            <button><FontAwesomeIcon icon={faBars} /></button>
            <nav>
                <span>
                    <a href='#'>Discover New</a>
                </span>
                <span>
                    <a href='#'>Search Cocktails</a>
                </span>
                <span>
                    <a href='#'>Meet the author</a>
                </span>
                <span>
                    <a href='#'>Contact</a>
                </span>
            </nav>
        </header>
    );
}