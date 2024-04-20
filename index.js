require('file-loader?name=[name].[ext]!./index.html');

import React from "react";
import ReactDOM from "react-dom";
import {App} from './src/App'
const rootElement = document.getElementById('app');
import { createHashRouter, RouterProvider } from "react-router-dom";

import Hero from './src/Hero';
import GridList from './src/GridList';
import RandomCocktailGenerator from './src/RandomCocktailGenerator';
import Details from "./src/Details";

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              path: "/",
              element: <Hero />,
            },
            {
                path: "/random",
                element: <RandomCocktailGenerator/>,
            },
            {
                path: "/search",
                element: <GridList/>,
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