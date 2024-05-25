import React from "react";
import { Link } from "react-router-dom";

export default function CocktailCard (props){
    const name = props.name;
    const imgSrc = props.img;
    const id = props.id;

    return(
        <Link to={'/details/'+ id} className="CC-C-cocktailCard_wrapper" data-testid={id} id= {id}>
            <img src={imgSrc} alt={name + ' Cocktail'}/>
            <h3>{name}</h3> 
        </Link>
    )
}