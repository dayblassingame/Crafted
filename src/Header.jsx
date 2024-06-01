import React, { useEffect, useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/craftedlogo.png";
import { Link } from "react-router-dom";


export default function Header(){
    const [menu, setMenu] = useState(false);
    
    const closeMenu = () =>{
        setMenu(false);
        window.scrollTo(0,0)
    }

    useEffect(()=>{
        if(menu ===true){
            document.body.style.overflowY = 'hidden';
        }else{
            document.body.style.overflowY = 'auto'
        }
    },[menu])

    useEffect(()=>{
        document.getElementById('main').addEventListener('click', (()=>setMenu(false)))
    })

    return(
        <header> 
            <div className="CC-C-header">
                <span className="CC-C-logo_span">
                    <a href="#"><img src={logo} alt="Logo image" className="CC-C-logo_img"/></a>
                </span>
                <span className='CC-C-nav_btn_wrapper'>
                    <button className='CC-C-nav_btn'> 
                        <Link to='/search'> <FontAwesomeIcon className='FAicon' icon={faSearch} onClick={()=>closeMenu()}/></Link>
                    </button>
                    <button data-testid='navBtn' className='CC-C-nav_btn' onClick={()=>{setMenu(!menu);}}>
                        <FontAwesomeIcon className='FAicon' icon={menu ? faX : faBars} />
                    </button>
                </span>
            </div>
            {menu && <Navigation handler={closeMenu} />}
        </header>
    );
}

export function Navigation(props){
    
    return(
        <nav className='CC-C-nav_list'>
                <li>
                    <Link to='/search' onClick = {props.handler} data-testid='navLink'>Search</Link>
                </li>
                <li>
                    <Link to='/featured' onClick = {props.handler} data-testid='navLink'>Popular Drinks</Link>
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