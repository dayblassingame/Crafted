import React from "react";
import GridList from "./GridList";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { fetchData } from "./Api";
import Error from "./Error";

export default function Featured(){
    const apiKey = 'v2/9973533';
    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [fetchFailed, setFetchFailed] = useState(false);

    useEffect(()=>{
        const endpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/popular.php';
        
        fetchData(endpoint).then((res) => {
            if(res != 'error' || typeof(res) == 'string')
                setCocktailList(res)
            else
                setFetchFailed(true);
        })
        setLoading(false)
    },[])

    if(isLoading)
        return(<Loading/>)
    else if(fetchFailed)
        return(<Error/>)
    else
        return(
            <div className="CC-C-section_wrapper">
                <div className="CC-C-section_featured">
                    <h2>Featured Cocktails</h2>
                    <GridList list={cocktailList} />
                </div>
            </div>
        )
    }