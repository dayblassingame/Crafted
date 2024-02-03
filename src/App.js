import React, { useState } from 'react';
import Header from './Header';
import './App.scss';
import Hero from './Hero';
import axios from 'axios';

export function App(){

    return(
        <div>
           <Header/>
           <main>
                <Hero/>:
            </main>
        </div>
    )
}