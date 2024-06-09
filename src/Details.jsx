import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { getIngredients } from "./RandomCocktailGenerator";
import Error from "./Error";

export default function Details(){
    const {id} = useParams();

    const cocktailEndpoint = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id;
    const [loading, setLoading] = useState(true);
    const [cocktail, setCocktail] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [fetchFailed, setFetchFailed] = useState(false)

    useEffect(()=>{
         fetchData(cocktailEndpoint).then(res => {
            if(typeof(res) != 'string'){
                setCocktail(res[0]);
                setIngredients(getIngredients(res[0]));
            }else
                setFetchFailed(true);
            setLoading(false)
        })
    },[])
    
    if(loading)
        return <Loading/>
    else if(fetchFailed)
        return <Error/>
    else
        return(
            <div className='CC-C-section_wrapper'>
                <h2 className="CC-C-section_details">{cocktail.strDrink}</h2>

                    <div className="CC-C-details_container">
                        <span>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                        </span>
                        <span>
                            <p>This drink is usually served in a {cocktail.strGlass}</p>

                            <ul>
                                <label>Ingredients</label>
                                {ingredients.map((ingredient)=>(
                                    <li>{ingredient}</li>))
                                }
                            </ul>
                            <label>Directions</label>
                            <p>{cocktail.strInstructions}</p>
                        </span>
                    </div>
            </div>
        )
}