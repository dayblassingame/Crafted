import React from "react";
import {cleanup, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import '@testing-library/jest-dom';
const axios = require('axios');
import Hero from "../Hero";
import { act } from "react-test-renderer";
const MockAdapter = require('axios-mock-adapter');

describe('TheCoctailDB API test', ()=>{

    afterEach(cleanup);

    test('should return data from API GET request', async () =>{
        const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=greyhound';

        const res = await axios.get(url);

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('drinks');
        expect(res.data.drinks[0].strDrink).toBe('Greyhound');

    })

    test('should return error message if GET request fails', async () => {
        const url='https://www.thecocktaildb.com/api/doesntexist';

        try{
            await axios.get(url);
        }catch(err){
            expect(err.response.status).toBe(404);
        }
    })

    test('should render data fetched from API and display ellipses before data is rendered', async () =>{
        jest.mock('axios');

        const mockData = {
            drinks:[
                {
                    idDrink: 123,
                    strDrink: 'drink',
                    strDrinkThumb: 'this.jpg'
                }
            ]
        };

        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

        render(<Hero />);

        // Assert that "Loading..." is initially rendered
        expect(screen.getByText('...')).toBeInTheDocument();

        // Wait for the data to be rendered after the GET request is complete
        await waitFor(() => {
            expect(screen.queryByTestId('heroApiImg')).toBeInTheDocument();
        });
    })
})