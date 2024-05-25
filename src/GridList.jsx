import React, { useEffect, useState } from "react";
import { fetchData} from "./Api";
import CocktailCard from './CocktailCard';
import Loading from "./Loading";

export default function GridList (props){
   const cocktailList = props.list;
   const empty = null;

    return(
        <div id={ 'Results'} className="CC-L-gridList">
            {cocktailList!=empty ?
                <div className='CC-L-gridList_results'> 
                    {cocktailList.map((cocktail)=>{
                        if(cocktail.strDrink != null && cocktail.strDrinkThumb != null){
                            return(
                                <CocktailCard key={cocktail.idDrink}
                                id={cocktail.idDrink}
                                name={cocktail.strDrink}
                                img  ={cocktail.strDrinkThumb}
                                alcoholic = {cocktail.strAlcoholic}
                                />
                            )
                        }else{
                            return;
                        }
                        
                    })
                    }

                    {cocktailList.length >= 4 ?
                        <button data-testid='return' onClick={()=>window.scrollTo(0,0)}>Return to top</button> : ''
                    }

                </div>
                :<h4>No results found</h4>
            }
        </div>
    )
}