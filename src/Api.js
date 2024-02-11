import React, { useCallback, useState } from "react";
import axios from "axios";

export async function fetchData (url){
    let data =[];
    await axios  
        .get(url)
        .then((response) =>{
            data = (response.data.drinks);
        }).catch((e)=>{console.log(e)})
    return data;
}

export async function fetchIngredientData (url){
    let data = [];
    let final = [];
    
    fetchData(url)
    .then(res=> {
        if(res != 'None Found')
            data = res;
    }).then(()=>{
        data.forEach((cocktail)=>{
            const individualEndpoint = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i='+ cocktail.idDrink;
            fetchData(individualEndpoint)
            .then((res )=> {
                let fullDetails = res[0];
                final.push(fullDetails);
            })
        })
    })
    return final;
}