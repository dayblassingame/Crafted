require('file-loader?name=[name].[ext]!./index.html');

import React from "react";
import ReactDOM from "react-dom";
import {App} from './src/App'
const rootElement = document.getElementById('app');
import { createHashRouter, RouterProvider } from "react-router-dom";

import Hero from './src/Hero';
import Discover from "./src/Discover";
import Search from './src/Search';
import RandomCocktailGenerator from './src/RandomCocktailGenerator';
import Details from "./src/Details";
import Featured from "./src/Featured";

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              path: "/",
              element: 
                <div>
                    <Hero />
                    <div id='discover' className='CC-C-section_wrapper'>
                        <Discover index='1' type={'Vodka'}/>
                        <Discover index='2' type={'Tequila'}/>
                        <Discover index='3' type={'Rum'} />
                    </div>
                    
                </div>,
            },
            {
                path: "/random",
                element: <RandomCocktailGenerator/>,
            },
            {
                path: "/search",
                element: <Search/>,
            },
            {
                path: "/featured",
                element: <Featured/>,
            },
            {
                path: "/details/:id",
                element:<Details/>

            }
        ],
    }
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
//ReactDOM.render(<App/>, rootElement);