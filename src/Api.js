import React, { useCallback, useState } from "react";
import axios from "axios";

export async function fetchHeroData(){
    let data = [];
    const displayURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=greyhound';

    axios  
        .get(displayURL)
        .then((response) =>{
            data = (response.data.drinks);
        }).catch((e)=>{console.log(e)})
    
    return {
        props: data
    }

}