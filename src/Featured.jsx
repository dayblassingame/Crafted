import React from "react";
import GridList from "./GridList";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { fetchData } from "./Api";

export default function Featured(){
    const apiKey = 'v2/9973533';
    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        const endpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/popular.php';
        
        fetchData(endpoint).then((res) => {
            setCocktailList(res)
        })
        .catch(error => {
            console.error(error);
        });
        setLoading(false)
            
    },[])

    return(
        !isLoading ?

        <div>
            <h1>Featured Cocktails</h1>
            <GridList list={cocktailList} />
        </div>

        :<Loading/>
    )
}