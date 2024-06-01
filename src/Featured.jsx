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

        <div className="CC-C-section_wrapper">
            <div className="CC-C-section_featured">
                <h2>Featured Cocktails</h2>
                <GridList list={cocktailList} />
            </div>
        </div>

        :<Loading/>
    )
}