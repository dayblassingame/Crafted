import React, { useState } from 'react';
import Header from './Header';
import './App.scss';
import Hero from './Hero';
import Footer from './Footer';
import GridList from './GridList';

export function App(){

    return(
        <div>
           <Header/>
           <main>
                {/* <Hero/> */}
                <GridList/>
           </main>
           <Footer/>

        </div>
    )
}