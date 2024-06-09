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
    const [fetchFailed ,setFetchFailed] = useState(false)

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
        setEndScroll((temp.length * 180) + ((temp.length-2)* 20))
        return temp;
    }

    useEffect(() => {
        fetchData(endpoint)
        .then(res => {
            if(typeof(res) != 'string')
                setArray(res)
            else{
                setFetchFailed(true)
                console.log('fetch failed')
            }
        })
    },[])

    useEffect(() => {
        if(!fetchFailed)
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

    const handleCarouselScroll = (e) =>{
        setPosition(e.target.scrollLeft)
    }

    if(fetchFailed)
        return(<div><h1></h1></div>)
    else
        return(
            <div id= {alcoholType + 'CocktailsSection'} className="CC-C-discover_container">
                <h2>{alcoholType + ' Cocktails'} </h2>
                <div className='CC-C-carousel_container'>
                    <button id={'scrollLeft' + index}className='CC-C-carousel_btn' onClick = {previous} ><FontAwesomeIcon icon={faChevronLeft} className="FAicon"/></button>
                    <ul id={'carousel' + index} className='CC-C-carousel_list' onScroll={handleCarouselScroll}>
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
                    <button id={'scrollRight' + index} className='CC-C-carousel_btn' onClick={next}><FontAwesomeIcon icon={faChevronRight} className="FAicon"/></button>
                </div>
            </div> 
        )
}