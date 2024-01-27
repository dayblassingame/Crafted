import React from "react";
import { useState } from "react";
import Logo from './images/craftedlogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    const [menu, setMenu] = useState(false);

    return(
        <header> 
            <div className="CC-C-header">
                <span className="CC-C-logo_span">
                    <a href="#"><img src={Logo} alt="Logo" className="CC-C-logo_img"/></a>
                </span>
                <button className='CC-C-nav_btn' onClick={()=>{setMenu(!menu);}}>
                    <FontAwesomeIcon icon={menu ? faX : faBars} />
                </button>
            </div>
            <nav className={menu ? 'CC-C-nav_list display_block': 'display_none'}>
                <li>
                    <a href='#'>Discover</a>
                </li>
                <li>
                    <a href='#'>Search Cocktails</a>
                </li>
                <li>
                    <a href='#'>Meet the author</a>
                </li>
                <li>
                    <a href='#'>Contact</a>
                </li>
            </nav>
        </header>
    );
}