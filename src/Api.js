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