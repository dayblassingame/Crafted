require('file-loader?name=[name].[ext]!./index.html');

import React from "react";
import ReactDOM from "react-dom";
import {App} from './src/App'
const rootElement = document.getElementById('app');
import Header from "./src/Header";
import Hero from './src/Hero';
import Footer from './src/Footer';
import GridList from './src/GridList';
import { createHashRouter, RouterProvider } from "react-router-dom";
import RandomCocktailGenerator from './src/RandomCocktailGenerator';

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
        ],
    }
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
//ReactDOM.render(<App/>, rootElement);