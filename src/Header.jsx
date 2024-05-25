import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/craftedlogo.png";
import { Link } from "react-router-dom";


export default function Header(){
    const [menu, setMenu] = useState(false);
    
    const closeMenu = () =>{
        setMenu(false);
    }

    return(
        <header> 
            <div className="CC-C-header">
                <span className="CC-C-logo_span">
                    <a href="#"><img src={logo} alt="Logo image" className="CC-C-logo_img"/></a>
                </span>
                <button className='CC-C-nav_btn'> 
                    <Link to='/search'> <FontAwesomeIcon className='FAicon' icon={faSearch} onClick={()=>setMenu(false)}/></Link>
                </button>
                <button data-testid='navBtn' className='CC-C-nav_btn' onClick={()=>{setMenu(!menu);}}>
                    <FontAwesomeIcon className='FAicon' icon={menu ? faX : faBars} />
                </button>
            </div>
            {menu && <Navigation handler={closeMenu} />}
        </header>
    );
}

export function Navigation(props){
    
    return(
        <nav className='CC-C-nav_list'>
                <li>
                    <Link to='/search' onClick = {props.handler} data-testid='navLink'>Search Cocktails</Link>
                </li>
                <li>
                    <Link to='/featured' onClick = {props.handler} data-testid='navLink'>Featured Cocktails</Link>
                </li>
                <li>
                    <Link to='/random' onClick = {props.handler} data-testid='navLink'>Random Cocktail Generator</Link>
                </li>
                <li>
                    <a href='#' onClick = {props.handler} data-testid='navLink'>Contact</a>
                </li>
            </nav>
    );
}