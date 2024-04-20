import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import GridList from "../GridList";
import '@testing-library/jest-dom'
const axios = require('axios');

describe('GridList test', ()=>{

    afterEach(cleanup);

    test('should only not display return to top button if results are less than 4 items', async () =>{
        jest.mock('axios');

        const mockData ={
            drinks:[
                {
                    idDrink: 123,
                    strDrink: 'drink',
                    strAlcoholic: 'Alcoholic',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg'
                },
                {
                    idDrink: 124,
                    strDrink: 'pinkdrink',
                    strAlcoholic: 'Alcoholic',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg'

                },
                {
                    idDrink: 125,
                    strDrink: 'yellowdrink',
                    strAlcoholic: 'Alcoholic',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg'
                },
                {
                    idDrink: 126,
                    strDrink: 'pirldrink',
                    strAlcoholic: 'Alcoholic',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg'
                },
                {
                    idDrink: 127,
                    strDrink: 'yewdrink',
                    strAlcoholic: 'Alcoholic',
                    strDrinkThumb: '../../mocks/testDrinkThumb.jpg'
                },
            ]
        }

        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

        render(<GridList />);

        // Wait for the data to be rendered after the GET request is complete
        await waitFor(() => {
            const returnBtn = screen.getByTestId('return')
            expect(returnBtn).toBeInTheDocument();
        });
    })

    // test('should display img with alt name', async () =>{
    //     jest.mock('axios');

    //     const mockData = {
    //         drinks:[
    //             {
    //                 idDrink: 123,
    //                 strDrink: 'drink',
    //                 strDrinkThumb: 'this.jpg'
    //             },
    //             {
    //                 idDrink: 124,
    //                 strDrink: 'pinkdrink',
    //                 strDrinkThumb: 'this1.jpg'
    //             },
    //             {
    //                 idDrink: 125,
    //                 strDrink: 'yellowdrink',
    //                 strDrinkThumb: 'this2.jpg'
    //             },
    //         ]
    //     };

    //     jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    //     render(<GridList />);

    //     // Wait for the data to be rendered after the GET request is complete
    //     await waitFor(() => {
    //         const pinkdrink = screen.getByAltText('pinkdrink cocktail')
    //         expect(pinkdrink).toBeInTheDocument();
    //     });
    // })

    // test('should display alcoholic if drink alcoholic property is alcoholic', async () =>{
    //     jest.mock('axios');

    //     const mockData = {
    //         drinks:[
    //             {
    //                 idDrink: 123,
    //                 strDrink: 'drink',
    //                 strDrinkThumb: 'this.jpg',
    //                 strAlcoholic: 'Alcoholic'
    //             },
    //             {
    //                 idDrink: 124,
    //                 strDrink: 'pinkdrink',
    //                 strDrinkThumb: 'this1.jpg',
    //                 strAlcoholic: 'nonalcoholic'

    //             },
    //             {
    //                 idDrink: 125,
    //                 strDrink: 'yellowdrink',
    //                 strDrinkThumb: 'this2.jpg',
    //                 strAlcoholic: 'Alcoholic'
    //             },
    //         ]
    //     };

    //     jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    //     render(<GridList />);

    //     // Wait for the data to be rendered after the GET request is complete
    //     await waitFor(() => {
    //         const alcoholicDrinks = screen.queryAllByText('alcoholic')
    //         expect(alcoholicDrinks.length).toBe(2);
    //     });
    // })

    // test('should not display cocktails missing a name or thumbnail img', async () =>{
    //     jest.mock('axios');

    //     const mockData = {
    //         drinks:[
    //             {
    //                 idDrink: 123,
    //                 strDrink: 'drink',
    //                 strAlcoholic: 'Alcoholic'
    //             },
    //             {
    //                 idDrink: 124,
    //                 strDrinkThumb: 'this1.jpg',
    //                 strAlcoholic: 'nonalcoholic'

    //             },
    //             {
    //                 idDrink: 125,
    //                 strDrink: 'yellowdrink',
    //                 strDrinkThumb: 'this2.jpg',
    //                 strAlcoholic: 'Alcoholic'
    //             },
    //         ]
    //     };

    //     jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    //     render(<GridList />);

    //     // Wait for the data to be rendered after the GET request is complete
    //     await waitFor(() => {
    //         expect(screen.queryByTestId(123)).not.toBeInTheDocument();
    //         expect(screen.queryByTestId(124)).not.toBeInTheDocument();
    //         expect(screen.queryByTestId(125)).toBeInTheDocument();

    //     });
    // })
})