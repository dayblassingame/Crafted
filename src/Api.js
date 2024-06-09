import React, { useCallback, useState } from "react";
import axios from "axios";

export async function fetchData (url){
    let data =[];
    await axios  
        .get(url)
        .then((response) =>{
            if(response == undefined)
                data='error'
            else if(response.data.drinks == null)
                data='error'
            else{
                data = (response.data.drinks);
            }
        }).catch((e)=>{data='error'})
    return data;
}
