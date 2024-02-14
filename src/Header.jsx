import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/craftedlogo.png";
import { Link } from "react-router-dom";
export default function Header(){
    const [menu, setMenu] = useState(false);

    return(
        <header> 
            <div className="CC-C-header">
                <span className="CC-C-logo_span">
                    <a href="#"><img src={logo} alt="Logo image" className="CC-C-logo_img"/></a>
                </span>
                <button data-testid='navBtn' className='CC-C-nav_btn' onClick={()=>{setMenu(!menu);}}>
                    <FontAwesomeIcon icon={menu ? faX : faBars} />
                </button>
            </div>
            {menu && <Navigation/>}
        </header>
    );
}

export function Navigation(){
    return(
        <nav className='CC-C-nav_list'>
                <li>
                    <Link to='/random' data-testid='navLink'>Random Cocktail Generator</Link>
                </li>
                <li>
                    <Link to='/search' data-testid='navLink'>Search Cocktails</Link>
                </li>
                <li>
                    <a href='#' data-testid='navLink'>Meet the author</a>
                </li>
                <li>
                    <a href='#' data-testid='navLink'>Contact</a>
                </li>
            </nav>
    );
}