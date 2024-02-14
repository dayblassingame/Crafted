import React, { useState } from 'react';
import Header from './Header';
import './App.scss';
import Footer from './Footer';
import { Outlet } from 'react-router';

export function App(){

    return(
        <div>
           <Header/>
           <main>
                <Outlet/>
           </main>
           <Footer/>

        </div>
    )
}