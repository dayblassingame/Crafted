import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import GridList from './GridList';
import { fetchData} from "./Api";
import Loading from "./Loading";
import { key } from "../Apikey";

export default function Search(){
    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [menu, setMenu] = useState(false);

    const [alcoholType, setAlcoholType] = useState('');

    const alcoholTypeFilter = ['non-alcoholic', 'vodka', 'tequila', 'dark rum', 'light rum', 'gin', 'bourbon', 'whiskey']

    useEffect(()=>{
        const debounceFetch = setTimeout(()=>{
            const searchEndpoint = 'https://www.thecocktaildb.com/api/json/' + key + '/search.php?s='+ search;
            
            if(search==''){
                return
            }else{
                setLoading(true)
                fetchData(searchEndpoint).then((res) => {
                    if(typeof(res) != 'string')
                        setCocktailList(res)
                })
                .catch(error => {
                    setSearch('')
                });
                setLoading(false)
            }
        }, [500])
        
        return ()=> clearTimeout(debounceFetch);
    },[search])

    useEffect(()=>{

        if(window.screen.width >= 1100){
            setMenu(true);
            return;
        }
        
        if(menu ===true){
            document.body.style.overflowY = 'hidden';
        }else{
            document.body.style.overflowY = 'auto'
        }
    },[menu])

    useEffect(()=>{
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
            <div id='search' data-testid='search' className="CC-C-search_wrapper">
                <div className="CC-C-search_container">
                    <input type='text' placeholder="Search by name" value={search} onChange={handleSearch}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <button className="CC-C-search_filterBtn"><FontAwesomeIcon icon={!menu? faFilter: faX} onClick={()=> setMenu(!menu)}/></button>
                </div>
                <div className="CC-C-search_results">
                    <div id='filters' className={menu ? "CC-C-filters_container": 'display_none'}>
                        <h4>Filter by alcohol:</h4>
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
                        search !='' ? <GridList id='searchResults' list={cocktailList} />: <GridList id='filterResults' list={filterList}/>
                    }
                </div>
            </div>
        : <Loading/>
    )
}