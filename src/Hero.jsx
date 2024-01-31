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
            <div>
                {displayCocktail.map((cocktail) => (
                    <span key={cocktail.idDrink}>
                        <h1>Sip into Bliss: Explore Our Signature Cocktails</h1>
                        <img src={cocktail.strDrinkThumb} alt="Greyhound Cocktail"/>
                        <button>Discover New</button>
                    </span>
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