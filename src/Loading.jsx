import React from "react";
import Logo from './images/craftedlogo.png';

export default function Loading(){

    return(
        <div className="p-C-loading_wrapper">
            <span>
                <img src={Logo} alt="Logo"/>
                <h1>...</h1>
            </span>
        </div>
    )
}