import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import GridList from "../GridList";
import '@testing-library/jest-dom'
import { HashRouter } from "react-router-dom";

describe('GridList test with mock data', ()=>{

    afterEach(cleanup);

    const mockData =[
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
            strDrink: 'purpledrink',
            strAlcoholic: 'Alcoholic',
            strDrinkThumb: null
        },
        {
            idDrink: 127,
            strDrink: 'orangedrink',
            strAlcoholic: 'Alcoholic',
            strDrinkThumb: '../../mocks/testDrinkThumb.jpg'
        },
    ]

    test('should only not display return to top button if results are less than 4 items', async () =>{
        const {getByTestId} = render(
            <HashRouter>
                <GridList id='results' list={mockData} />
            </HashRouter>
        )

        expect(getByTestId(124)).toBeInTheDocument();
    })

    test.failing('should not display cocktails missing drink thumbnail', ()=>{
        const {getByTestId} = render(
            <HashRouter>
                <GridList id='results' list={mockData} />
            </HashRouter>
        )

        expect(getByTestId(126)).toBeInTheDocument();
    })
})

test('should display no results found if no data is passed through', ()=> {
    const {getByText} = render(
        <HashRouter>
            <GridList id='results' list={null} />
        </HashRouter>
    )

    expect(getByText('No results found')).toBeInTheDocument();
})