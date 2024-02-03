import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
            <div id='search' className="p-L-gridList">
                <span>
                    <input type='text' placeholder="Search Cocktails..."/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </span>
                {
                    cocktailList.map((cocktail)=>(
                      <Cocktail key={cocktail.idDrink}
                        name={cocktail.strDrink}
                        img={cocktail.strDrinkThumb}
                        alcoholic={cocktail.strAlcoholic}
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

    let alcoholic=false;

    if(props.alcoholic == ('Alcoholic'))
        alcoholic=true;

    return(
        <div className="p-C-cocktailCard_wrapper">
            <img src={imgSrc} alt={name + " cocktail"}/>
            <h3>{name}</h3> 
            <p className={alcoholic ? 'p-C-cocktailCard-tag_alcoholic': 'p-C-cocktailCard-tag_non-alcoholic'}>{alcoholic ? 'alcholic': 'non-alcoholic'}</p>
        </div>
    )
}