import React, { useCallback, useEffect, useState } from "react";
import backgroundImg from './images/EspressoMartini.jpg'
import Loading from "./Loading";
import RandomCocktailGenerator from "./RandomCocktailGenerator";

export default function Hero(){
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    const goToDiscover = () => {
       const discover = document.getElementById('discover');
       discover.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=>{
        setLoading(false)

        setTimeout(()=>{ 
            setModal(true)
        },[10000])
    },[])

    return loading ? <Loading/> : (
        <div>
            <div id='hero' data-testid='hero' className="CC-C-hero">
                <div className='CC-C-backgroundImg'>
                    <img  src={backgroundImg}/>
                </div>
                <span className='CC-C-hero_heading'>
                    <h2>Sip into Bliss</h2>
                    <h4>Explore Our Signature Cocktails</h4>
                    <button data-testid='discoverBtn' onClick={goToDiscover}>Discover</button>
                </span>
            </div>
            {modal && <RandomCocktailGenerator/>}
        </div> 
        );
   
}