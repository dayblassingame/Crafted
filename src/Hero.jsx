import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loading from './Loading';
import { fetchData } from "./Api";
import backgroundImg from './images/EspressoMartini.jpg'

export default function Hero(){
    const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=greyhound';

    const[cocktail, setDisplayCocktail] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData(apiEndpoint).then(res => {
            setDisplayCocktail(res[0])
            setLoading(false);
        })
    },[])

    const goToDiscover = () => {
       const discover = document.getElementById('discover');
       discover.scrollIntoView({behavior: "smooth"})
    }

    if(!isLoading){
        return(
            <div className="CC-C-hero">
                <div className='CC-C-backgroundImg'>
                    <img  src={backgroundImg}/>
                </div>
                <span className='CC-C-hero_heading'>
                    <h2>Sip into Bliss</h2>
                    <h4>Explore Our Signature Cocktails</h4>
                    <button onClick={goToDiscover}>Discover</button>
                </span>
            </div>
         );
    }else{
        return(
            <Loading/>
        )
    }
}