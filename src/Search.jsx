import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import GridList from './GridList';
import { fetchData} from "./Api";
import Loading from "./Loading";

export default function Search(){

    const apiKey = 'v2/9973533';
    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterList, setFilterList] = useState([]);

    const [alcoholType, setAlcoholType] = useState('');

    const alcoholTypeFilter = ['non-alcoholic', 'vodka', 'tequila', 'dark rum', 'light rum', 'gin', 'bourbon', 'whiskey']

    useEffect(()=>{
        const debounceFetch = setTimeout(()=>{
            const searchEndpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/search.php?s='+ search;
            
            if(search==''){
                return
            }else{
                setLoading(true)
                fetchData(searchEndpoint).then((res) => {
                    setCocktailList(res)
                    })
                .catch(error => {
                    console.error(error);
                });
                setLoading(false)
            }
        }, [500])
        
        return ()=> clearTimeout(debounceFetch);
    },[search])

    useEffect(()=>{
        console.log('here')
        let filterEndpoint = '';
        if(alcoholType === '')
            return
        else if(alcoholType === 'non-alcoholic')
            filterEndpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/filter.php?a=non_alcoholic';
        else  
            filterEndpoint = 'https://www.thecocktaildb.com/api/json/' + apiKey + '/filter.php?i='+ alcoholType;
        setLoading(true)
        fetchData(filterEndpoint).then((res) => {
            setFilterList(res)
            })
        .catch(error => {
            console.error(error);
        });
        setLoading(false)
                    
    },[alcoholType])

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    const handleFilters=(e)=>{
        setSearch('')
        setAlcoholType(e.target.value)
    }
    
    return(

        !isLoading ? 
            <div id='search' className="CC-C-search_wrapper">
                <div className="CC-C-search_container">
                    <input type='text' placeholder="Search by name" value={search} onChange={handleSearch}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <button><FontAwesomeIcon icon={faFilter} /></button>
                </div>
                <div id='filters' className="CC-C-filters_container">
                    {
                        alcoholTypeFilter.map((alcoholType) => (
                            <span>
                                <input type='radio' id={alcoholType} name='alcoholType' value={alcoholType} onChange={handleFilters}/>
                                <label>{alcoholType}</label>
                            </span>
                        ))
                    }
                </div>
                {
                    search !='' ? <GridList list={cocktailList} />: <GridList list={filterList}/>
                }
            </div>
        : <Loading/>
    )
}