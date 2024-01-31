import React, { useCallback, useState } from "react";
import axios from "axios";

export default function fetchCocktailData(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=greyhound';
    const [data, setData] = useState([]);

    const getData = useCallback(() => {
        axios  
            .get(url)
            .then((response) =>{
                console.log(response.data);
                setData(response.data.drinks);
            }).catch((e)=>{console.log(e)})
    },[data])

    return data;
}

// = useCallback(()=>{
//     const [data, setData] = useState([]);

//     const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=greyhound';

//     axios.get(url).than(response => {
//         console.log(response.data);
//         setData(response.data.drinks);
//     }).catch(e=>console.log(e))

//     return data;

//},[])