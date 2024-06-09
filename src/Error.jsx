import React from "react";
import { Link } from "react-router-dom";

export default function Error(){

    return(
        <div id='errorPage' className="CC-C-error">
            <span>
                <h1>404</h1>
                <p>This page does not exist</p>
                <Link to='/'>Click here to navigate back to the homepage</Link>
            </span>
        </div>
    )
}