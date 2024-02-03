import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loading from './Loading';
import { fetchData } from "./Api";


export default function Hero(){
    const displayURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=greyhound';

    const[displayCocktail, setDisplayCocktail] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData(displayURL).then(res => {
            setDisplayCocktail(res)
            setLoading(false);
        })
        //setDisplayCocktail(props(displayURL));
    },[])

    if(!isLoading){
        return(
            <div className="p-C-hero">
                {displayCocktail.map((cocktail) => (
                    <div className='p-C-hero_wrapper' key={cocktail.idDrink}>
                        <img src={cocktail.strDrinkThumb} alt="Greyhound Cocktail"/>
                        <span className='p-C-hero_heading'>
                            <h2>Sip into Bliss</h2>
                            <h3>Explore Our Signature Cocktails</h3>
                            <button>Discover</button>
                        </span>
                    </div>
                ))}
            </div>
         );
    }else{
        return(
            <Loading/>
        )
    }
}