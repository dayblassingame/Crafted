import React from "react";
import Logo from './images/craftedlogo.png';

export default function Loading(){

    return(
        <div id='loading' data-testid='loading' className="CC-C-loading_wrapper">
            <div className="CC-C-loading"></div>
        </div>
    )
}