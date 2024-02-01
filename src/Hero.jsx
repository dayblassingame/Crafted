import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Hero(){
    const[displayCocktail, setDisplayCocktail] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const displayURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=greyhound';

    const fetchData = useCallback((url) => {
        setLoading(true);

        axios  
            .get(url)
            .then((response) =>{
                setDisplayCocktail(response.data.drinks);
            }).catch((e)=>{console.log(e)})
            .finally(() => setLoading(false))
    },[])

    useEffect(()=>{
        fetchData(displayURL);
    },[fetchData])

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
            <div>
                <h1>Cannot Load Page</h1>
            </div>
        )
    }
}