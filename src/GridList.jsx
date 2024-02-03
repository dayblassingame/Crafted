import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import Loading from "./Loading";

export default function GridList (){
    const apiEndpoint = 'https://thecocktaildb.com/api/json/v1/1/search.php?f=a';

    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData(apiEndpoint).then(res=>{
            setCocktailList(res);
            setLoading(false);
        })
    },[])

    if(!isLoading){
        return(
            <div>
                {
                    cocktailList.map((cocktail)=>(
                      <Cocktail key={cocktail.idDrink}
                        name={cocktail.strDrink}
                        img={cocktail.strDrinkThumb}
                      />
                    ))
                }
            </div>
        )
    }else{
        return(<Loading/>)
    }
    
}

const Cocktail = (props) =>{
    const name = props.name;
    const imgSrc = props.img;

    return(
        <div className="p-C-cocktailCard_wrapper">
            <img src={imgSrc} alt={name + " cocktail"}/>
            <h4>{name}</h4> 
        </div>
    )
}