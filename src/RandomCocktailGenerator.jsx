import React, { useState, useEffect } from "react";
import { fetchData } from "./Api";

export default function RandomCocktailGenerator(){
    const apiKey = 'v2/9973533'
    const apiEndpoint = 'https://www.thecocktaildb.com/api/json/'+ apiKey+ '/randomselection.php';
    const [randomList, setRandomList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCocktail, setCurrentCocktail] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        if(randomList.length==0){
            fetchData(apiEndpoint)
            .then(res => {
                setRandomList(res);
                setIndex(0);
                setCurrentCocktail(res[0]);
                setLoading(false);
            })
        }
    }, [randomList])

    const handleRandom = (e) =>{
        if(index < 9){
            setIndex(index+1)
            setCurrentCocktail(randomList[index+1])
        }else{
            setRandomList([]);
        }
    }


    return(
        <div className='CC-C-randomCocktailGenerator_container_wrapper'>
            <h1>Random Drink Generator</h1>

            {!loading ? 
                <div className="CC-C-randomCocktailGenerator_container">
                    <h2>{currentCocktail.strDrink}</h2>
                    <img src={currentCocktail.strDrinkThumb} />
                    <ul>
                        <label>Ingredients</label>
                        {getIngredients(currentCocktail).map((ingredient) =>{
                            return(
                                <li>{ingredient}</li>
                            )
                        })}
                    </ul>
                    <span>
                        <label>Instructions</label>
                        <p>{currentCocktail.strInstructions}</p>
                    </span>
                </div>
                :''
            }
            <button id='next' onClick={handleRandom}>Next</button>
        </div>
    )
}

function getIngredients(cocktail){
    let counter = 1;
    let ingredient = cocktail['strIngredient' + counter];
    let measurement = cocktail['strMeasure' + counter];
    let ingredientArray = [];

    console.log(ingredient)

    while(ingredient != null){
        ingredientArray.push(measurement + ' ' + ingredient);
        counter++;
        ingredient = cocktail['strIngredient' + counter];
        measurement = cocktail['strMeasure' + counter];
        console.log(ingredientArray);
    }

    return ingredientArray;
}