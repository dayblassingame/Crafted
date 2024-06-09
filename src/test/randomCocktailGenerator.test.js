import React from "react";
import {render, cleanup, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomCocktailGenerator from "../RandomCocktailGenerator";
import { TestEnvironment } from "jest-environment-jsdom";
import { HashRouter } from "react-router-dom";

const axios = require('axios');

describe('RandomCocktailGenerator test', ()=>{
    afterEach(cleanup);

    beforeEach(() => {
        fetchMock.resetMocks()
    })

    test('should display loading before data is received from api', async () =>{
        const {getByTestId} = render(
            <HashRouter>
                <RandomCocktailGenerator/>
            </HashRouter>
        )

        expect(getByTestId('loading')).toBeInTheDocument();
    })
})