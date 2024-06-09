import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loading from './Loading';
import { fetchData } from "./Api";
import backgroundImg from './images/EspressoMartini.jpg'

export default function Hero(){
    const goToDiscover = () => {
       const discover = document.getElementById('discover');
       discover.scrollIntoView({behavior: "smooth"})
    }

    return(
        <div id='hero' data-testid='hero' className="CC-C-hero">
            <div className='CC-C-backgroundImg'>
                <img  src={backgroundImg}/>
            </div>
            <span className='CC-C-hero_heading'>
                <h2>Sip into Bliss</h2>
                <h4>Explore Our Signature Cocktails</h4>
                <button data-testid='discoverBtn' onClick={goToDiscover}>Discover</button>
            </span>
        </div>
        );
   
}