import React, { useState } from 'react';
import Header from './Header';
import './App.scss';
import Footer from './Footer';
import { Outlet } from 'react-router';
import backgroundImg from './images/EspressoMartini.jpg'

export function App(){

    return(
        <div>
           <Header/>
           <div className='CC-C-backgroundImg'>
                <img  src={backgroundImg}/>
            </div>
           <main>
                <Outlet/>
           </main>
           <Footer/>

        </div>
    )
}