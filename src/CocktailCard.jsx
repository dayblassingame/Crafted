import React from "react";
import { Link } from "react-router-dom";

export default function CocktailCard (props){
    const name = props.name;
    const imgSrc = props.img;
    const id = props.id;

    return(
        <div title={name} className="CC-C-cocktailCard_wrapper">
            <img src={imgSrc} alt={name + ' Cocktail'}/>
            <h4 >{name}</h4> 
            <Link to={'/details/'+ id} onClick ={()=> window.scrollTo(0,0)} className="CC-C-cocktailCard_link" data-testid={id} id= {id}>View Recipe</Link>
        </div>
    )
}