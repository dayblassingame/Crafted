import React, { useEffect, useState } from "react";
import { fetchData, fetchIngredientData } from "./Api";
import { Link } from "react-router-dom";
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
            
            if(search==''){
                fetchData(defaultEndpoint)
                .then(res => {
                    setCocktailList(res);
                    console.log(res);
                    setLoading(false)
                })
            }else{
                let searchNameResults = [];

                const req1 = fetchData(searchNameEndpoint).then((res) => {
                    if(res != null)
                        searchNameResults = res;
                    });

                Promise.all([req1])
                .then(() => {
                    console.log(searchNameResults);
                    if(searchNameResults.length!=0) {
                        setCocktailList(searchNameResults); 
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
            <div id='search' className="CC-L-gridList">
                <span>
                    <input type='text' placeholder="Search by name" value={search} onChange={handleSearch}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </span>
                {cocktailList!=empty ?
                    <div className='CC-L-gridList_results'> 
                        {cocktailList.map((cocktail)=>{
                            if(cocktail.strDrink != null && cocktail.strDrinkThumb != null){
                                return(
                                    <Cocktail key={cocktail.idDrink}
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
    }else{
        return(<Loading/>)
    }
}

const Cocktail = (props) =>{
    const name = props.name;
    const imgSrc = props.img;
    const id = props.id;

    let alcoholic=false;

    if(props.alcoholic == ('Alcoholic'))
        alcoholic=true;

    return(
        <Link to={'/details/'+ id} className="CC-C-cocktailCard_wrapper" data-testid={id} id= {id}>
            <img src={imgSrc} alt={name}/>
            <h3>{name}</h3> 
            <p className={alcoholic ? 'CC-C-cocktailCard-tag_alcoholic': 'CC-C-cocktailCard-tag_non-alcoholic'}>{alcoholic ? 'alcoholic': 'non-alcoholic'}</p>
        </Link>
    )
}