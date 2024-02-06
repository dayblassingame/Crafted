import React from 'react';
import Header from './Header';
import './App.scss';
import Hero from './Hero';
import Footer from './Footer';

export function App(){
    return(
        <div>
           <Header/>
           <main>
                <Hero/>
           </main>
           <Footer/>
        </div>
    )
}