import React from "react";
import {cleanup, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
const axios = require('axios');
import Hero from "../Hero";

describe('TheCoctailDB API test', ()=>{

    afterEach(cleanup);

    test('renders hero component by default', ()=>{
        const {getByTestId} = render(
            <Hero/>
        );
        expect(getByTestId('hero')).toBeInTheDocument();
    })
})