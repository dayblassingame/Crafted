import React, { useState } from 'react';
import Header from './Header';
import './App.scss';
import Hero from './Hero';
import Footer from './Footer';
import GridList from './GridList';
import RandomCocktailGenerator from './RandomCocktailGenerator';


export function App(){

    return(
        <div>
           <Header/>
           <main>
                <Hero/>
                <RandomCocktailGenerator/>
                {/* <GridList/> */}
           </main>
           <Footer/>

        </div>
    )
}