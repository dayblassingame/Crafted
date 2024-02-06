import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function GridList (){
    const apiKey = 'v2/9973533';
    const defaultEndpoint = 'https://www.thecocktaildb.com/api/json/'+ apiKey + '/latest.php';

    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    let empty = null;

    useEffect(()=>{
        const searchEndpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/search.php?s='+ search;

        if(search==''){
            fetchData(defaultEndpoint)
            .then(res => {
                setCocktailList(res);
                setLoading(false)
            })
        }else{
            fetchData(searchEndpoint)
            .then(res => {
                setCocktailList(res);
            })
        }
    },[search])

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!isLoading){
        return(
            <div id='search' className="p-L-gridList">
                <span>
                    <input type='text' placeholder="Search Cocktails..." value={search} onChange={handleSearch}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </span>
                {cocktailList!==empty ? 
                    cocktailList.map((cocktail)=>(
                        <Cocktail key={cocktail.idDrink}
                        name={cocktail.strDrink}
                        img={cocktail.strDrinkThumb}
                        alcoholic={cocktail.strAlcoholic}
                        />
                    )):<h4>No results found</h4>
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