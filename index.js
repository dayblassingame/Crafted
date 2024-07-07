import React from "react";
import ReactDOM from "react-dom";
import {App} from './src/App'
const rootElement = document.getElementById('app');
import { createHashRouter, RouterProvider } from "react-router-dom";

import Hero from './src/Hero';
import Discover from "./src/Discover";
import Search from './src/Search';
import Details from "./src/Details";
import Featured from "./src/Featured";
import Error from "./src/Error";
import RandomCocktailGenerator from "./src/RandomCocktailGenerator";

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              path: "/",
              element: 
                <div id ='home'>
                    <Hero />
                    <div id='discover' data-testid='discover' className='CC-C-section_wrapper'>
                        <Discover index='1' type={'Vodka'}/>
                        <Discover index='2' type={'Tequila'}/>
                        <Discover index='3' type={'Rum'} />
                    </div>
                </div>,
            },
            {
                path: "/search",
                element: <Search/>,
                errorElement: <Error/>,
            },
            {
                path: "/featured",
                element: <Featured/>,
                errorElement: <Error/>,
            },
            {
                path: "/details/:id",
                element:<Details/>,
                errorElement: <Error/>,

            },
            {
                path: "/error",
                element:<Error/>,
                errorElement: <Error/>,
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