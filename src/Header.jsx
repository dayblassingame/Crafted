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
        <header id='header' data-testid='header'> 
            <div className="CC-C-header">
                <span className="CC-C-logo_span">
                    <a href="#"><img src={logo} alt="Logo image" className="CC-C-logo_img"/></a>
                </span>
                <span className='CC-C-nav_btn_wrapper'>
                    <button className='CC-C-nav_btn' data-testid='searchBtn' onClick={()=>closeMenu()}> 
                        <Link to='/search'> <FontAwesomeIcon className='FAicon' icon={faSearch} /></Link>
                    </button>
                    <button data-testid='navMenuBtn' className='CC-C-nav_btn' onClick={()=>{setMenu(!menu);}}>
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
        <nav className='CC-C-nav_list' data-testid='navMenu'>
                <li>
                    <Link to='/search' onClick = {props.handler} data-testid='navLink'>Search</Link>
                </li>
                <li>
                    <Link to='/featured' onClick = {props.handler} data-testid='navLink'>Popular Drinks</Link>
                </li>
                <li>
                    <a href='https://dayblassingame.github.io/#contact' onClick = {props.handler} data-testid='navLink'>Contact</a>
                </li>
            </nav>
    );
}