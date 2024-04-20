import React from "react";
import {render, cleanup, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomCocktailGenerator from "../RandomCocktailGenerator";

const axios = require('axios');

describe('RandomCocktailGenerator test', ()=>{
    afterEach(cleanup);

    test('should display new cocktail when choose again button is clicked', async () =>{
        jest.mock('axios');

        const headingData = [
            {
                idDrink: 101,
                strDrink: 'headingImg',
                strDrinkThumb: '../../mocks/testDrinkThumb.jpg',
            }
        ]

        const randomData = {
            drinks:[
                {
                    idDrink: 111,
                    strDrink: 'yellowdrink',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg',
                    strIngredients1: 'yellow',
                    strMeasure1: '1oz',
                    strInstructions: 'pour'
                },
                {
                    idDrink: 112,
                    strDrink: 'purpledrink',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg',
                    strIngredients1: 'purple',
                    strInstructions: 'pour'
                },
                {
                    idDrink: 113,
                    strDrink: 'orangedrink',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg',
                    strIngredients1: 'orange',
                    strInstructions: 'pour'
                }
            ]
        };

        const mock = jest.fn()
        .mockResolvedValueOnce(headingData)
        .mockResolvedValueOnce(randomData)

        render(<RandomCocktailGenerator/>);
        await mock();
        await mock(() => { 
            expect(screen.queryByTestId(111)).toBeInTheDocument();
            const nextBtn = screen.getByTestId('next');
            fireEvent.click(nextBtn);
            expect(screen.queryByTestId(112)).toBeInTheDocument();
        })
    })
})