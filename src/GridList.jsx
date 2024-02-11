import React, { useEffect, useState } from "react";
import { fetchData, fetchIngredientData } from "./Api";
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
        const debounceFetch = setTimeout(()=>{
            const searchNameEndpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/search.php?s='+ search;
            const searchIngEndpoint = 'https://www.thecocktaildb.com/api/json/'+ apiKey + '/filter.php?i=' + search;
            
            if(search==''){
                fetchData(defaultEndpoint)
                .then(res => {
                    setCocktailList(res);
                    setLoading(false)
                })
            }else{
                let searchNameResults = [];
                let searchIngResults = [];

                const req1 = fetchData(searchNameEndpoint).then((res) => {
                    if(res != null)
                        searchNameResults = res;
                    });
                const req2 = fetchIngredientData(searchIngEndpoint).then((res) => {
                    if(res != null)
                        searchIngResults = res;
                    });

                Promise.all([req1, req2])
                .then(() => {
                    if(searchNameResults.length==0 && searchIngResults.length==0) return;
                    if(searchIngResults.length==0){
                         setCocktailList(searchNameResults);
                        return;
                    }
                    if(searchNameResults.length==0) {
                        setCocktailList(searchIngResults); 
                        return;
                    }
                    else {
                        setCocktailList(searchNameResults.concat(searchIngResults))
                        return;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }, [500])
        
        return ()=> clearTimeout(debounceFetch);
    },[search])

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!isLoading){
        return(
            <div id='search' className="p-L-gridList">
                <span>
                    <input type='text' placeholder="Search by name or ingredient" value={search} onChange={handleSearch}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </span>
                {cocktailList!=empty ? 
                    cocktailList.map((cocktail)=>{
                        if(cocktail.strDrink != undefined){
                            return(
                                <Cocktail key={cocktail.idDrink}
                                id={cocktail.idDrink}
                                name={cocktail.strDrink}
                                img  ={cocktail.strDrinkThumb}
                                alcoholic={cocktail.strAlcoholic}
                                />
                            )
                        }else{
                            return;
                        }
                        
                    }):<h4>No results found</h4>
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
    const id = props.ig;

    let alcoholic=false;

    if(props.alcoholic == ('Alcoholic'))
        alcoholic=true;

    return(
        <div className="p-C-cocktailCard_wrapper" id= {id}>
            <img src={imgSrc} alt={name + " cocktail"}/>
            <h3>{name}</h3> 
            <p className={alcoholic ? 'p-C-cocktailCard-tag_alcoholic': 'p-C-cocktailCard-tag_non-alcoholic'}>{alcoholic ? 'alcholic': 'non-alcoholic'}</p>
        </div>
    )
}