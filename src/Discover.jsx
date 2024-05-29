import React, { useEffect, useState } from "react";
import CocktailCard from "./CocktailCard";
import { fetchData } from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Discover(props){
    const index = props.index;
    const alcoholType = (props.type);

    const [cocktailList, setCocktailList] = useState([]);
    const [position, setPosition] = useState(0);
    const [endScroll, setEndScroll] = useState(0);

    const apiKey = 'v2/9973533';
    const endpoint = 'https://www.thecocktaildb.com/api/json/' +apiKey + '/filter.php?i=' + alcoholType;

    const setArray = (arr) =>{
        let temp = [];
        let i=0, random=0;
        
        while(i<20 && i < arr.length){
            random = Math.floor(Math.random()*arr.length)
            temp.push(arr[random]);
            arr.splice(random,1); 
            i++;
        }

        setCocktailList(temp)
        setEndScroll(temp.length *120)
        return temp;
    }

    useEffect(() => {
        try{
            fetchData(endpoint)
            .then(res => {
                setArray(res)
            })
        }catch(err){
            console.log(err)
        }
    },[])

    useEffect(() => {
        updateArrows();
    })

    const updateArrows=(e)=>{
        const carousel = document.getElementById('carousel'+index);
        if(position === 0){
            document.getElementById('scrollLeft' + index).style.display = 'none'
        }else{
            document.getElementById('scrollLeft' + index).style.display = 'block'
        }

        if(endScroll - position <= carousel.clientWidth){
            document.getElementById('scrollRight' + index).style.display = 'none'
            
        }else
            document.getElementById('scrollRight' + index).style.display = 'block'
    }

    const previous = () =>{
        const carousel = document.getElementById('carousel'+index);
        carousel.scrollBy({left: -200, behavior: 'smooth'})
        setPosition(position - 200);
    }

    const next = () =>{
        const carousel = document.getElementById('carousel'+index);
        carousel.scrollBy({left: 200, behavior: 'smooth'})
        setPosition(position + 200);
    }


    return(
        <div>
            <h2>{alcoholType + ' Cocktails'} </h2>
            <div className='CC-C-carousel_container'>
                <button id={'scrollLeft' + index}className='CC-C-carousel_btn' onClick = {previous} ><FontAwesomeIcon icon={faChevronLeft} /></button>
                <ul id={'carousel' + index} className='CC-C-carousel_list'>
                    {cocktailList.map((cocktail) =>{
                        if(cocktail.strDrink != null && cocktail.strDrinkThumb != null){
                            return(
                                <CocktailCard key={cocktail.idDrink}
                                id={cocktail.idDrink}
                                name={cocktail.strDrink}
                                img  ={cocktail.strDrinkThumb}
                                />
                            )
                        }else{
                            return;
                        }
                    })}
                </ul>
                <button id={'scrollRight' + index} className='CC-C-carousel_btn' onClick={next}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div> 
    )
}