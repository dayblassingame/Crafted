import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { getIngredients } from "./RandomCocktailGenerator";

export default function Details(){
    const {id} = useParams();

    const cocktailEndpoint = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id;
    const [loading, setLoading] = useState(true);
    const [cocktailDetails, setCocktailDetails] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(()=>{
         fetchData(cocktailEndpoint).then(res => {
            setCocktailDetails(res);
            setIngredients(getIngredients(res[0]));
            setLoading(false);
        })
    },[])

    return( loading ? <Loading/> :
        <div className='CC-C-details_mainwrapper'>
            {cocktailDetails.map((cocktail)=>(
                <div className="CC-C-details_container">
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>

                    <h1>{cocktail.strDrink}</h1>
                    <p>This drink is usually served in a {cocktail.strGlass}</p>

                    <ul>
                        <label>Ingredients</label>
                        {ingredients.map((ingredient)=>(
                            <li>{ingredient}</li>))
                        }
                    </ul>
                    <label>Directions</label>
                    <p>{cocktail.strInstructions}</p>
                </div>
            ))}
            
        </div>
    )
}