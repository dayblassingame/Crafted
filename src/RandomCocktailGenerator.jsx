import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "./Api";
import Loading from "./Loading";
import Error from './Error';
import { key } from "../Apikey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function RandomCocktailGenerator(){
    const apiEndpoint = 'https://www.thecocktaildb.com/api/json/'+  key + '/randomselection.php';
    const [randomList, setRandomList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCocktail, setCurrentCocktail] = useState({});
    const [index, setIndex] = useState(0);
    const [fetchFailed, setFetchFailed] = useState(false)

    const [menu, setMenu] = useState('true');

    useEffect(()=>{
        if(randomList.length==0){
            setLoading(true);
            fetchData(apiEndpoint)
            .then(res => {
                if(res !='error'){
                    setRandomList(res);
                    setIndex(0);
                    setCurrentCocktail(res[0]);
                    setLoading(false);
                }else{
                    setLoading(false)
                    setFetchFailed(true)
                }
            })
        }
    }, [randomList])

    const handleRandom = (e) =>{
        window.scrollTo(0,0);

        if(index < randomList.length-1){
            setIndex(index+1)
            setCurrentCocktail(randomList[index+1])
        }else{
            setRandomList([]);
        }
    }

    if(loading){
        return(<Loading/>)
    }else if(fetchFailed)
        return (<Error/>)
    else{
        return(
            loading ? <Loading/> :
            <div className= {menu ? "CC-C-section_wrapper" : "display_none"} id='randomGenerator'>
                <div className='CC-C-randomCocktailGenerator_container_wrapper'>
                    <button className="close" onClick={()=>setMenu(false)}>
                        <FontAwesomeIcon className="icon" icon={faX} />
                    </button>

                    <h4>Can't decide on a cocktail? Let us choose for you!</h4>


                    {!loading ? 
                        <div className="CC-C-randomCocktailGenerator_container">
                            <div>
                                <h2>{currentCocktail.strDrink}</h2>
                                <img src={currentCocktail.strDrinkThumb} />

                                <span>
                                    <Link to={'/details/'+ currentCocktail.idDrink} onClick ={()=> window.scrollTo(0,0)} style={{textDecoration: "none"}} className="button" id={currentCocktail.idDrink}>View Recipe</Link>
                                    <button data-testid='next' onClick={handleRandom} className="button">Choose again</button>
                                </span>
                            </div>
                            {/* <span>
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
                            </span> */}
                        </div>
                        :''
                    }

                </div>
            </div>
        )
    }
}

export function getIngredients(cocktail){
    let counter = 1;
    let ingredient = cocktail['strIngredient' + counter];
    let measurement = cocktail['strMeasure' + counter];
    let ingredientArray = [];

    while(ingredient != null && ingredient!=''){
        if(measurement ==null)         
            ingredientArray.push(ingredient);
        else ingredientArray.push(measurement + ' ' + ingredient);
        counter++;
        ingredient = cocktail['strIngredient' + counter];
        measurement = cocktail['strMeasure' + counter];
    }

    return ingredientArray;
}