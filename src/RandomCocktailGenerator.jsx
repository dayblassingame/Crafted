import React, { useState, useEffect } from "react";
import { fetchData } from "./Api";
import Loading from "./Loading";

export default function RandomCocktailGenerator(){
    const apiKey = 'v2/9973533'
    const headingImgEnpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/search.php?s=rum%20punch';
    const apiEndpoint = 'https://www.thecocktaildb.com/api/json/'+ apiKey+ '/randomselection.php';
    const [randomList, setRandomList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCocktail, setCurrentCocktail] = useState({});
    const [index, setIndex] = useState(0);
    const [headingImg, setHeadingImg] =useState({});

    useEffect(()=>{
        fetchData(headingImgEnpoint)
        .then(res => {
            setHeadingImg(res[0]);
        })
    },[])

    useEffect(()=>{
        if(randomList.length==0){
            setLoading(true);
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
        window.scrollTo(0,0);

        if(index < 9){
            setIndex(index+1)
            setCurrentCocktail(randomList[index+1])
        }else{
            setRandomList([]);
        }
    }


    return(
        loading ? <Loading/> :
        <div className='CC-C-randomCocktailGenerator_container_wrapper'>
            <span className='CC-C-randomCocktailGenerator_heading_img_wrapper'>
                <img src={headingImg.strDrinkThumb} alt="Rum Punch Cocktail" />
                <span className="overlay"></span>
                <h1>Random Refreshments</h1>
            </span>

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

    while(ingredient != null){
        if(measurement ==null)         
            ingredientArray.push(ingredient);
        else ingredientArray.push(measurement + ' ' + ingredient);
        counter++;
        ingredient = cocktail['strIngredient' + counter];
        measurement = cocktail['strMeasure' + counter];
    }

    return ingredientArray;
}