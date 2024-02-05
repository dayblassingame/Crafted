import React from "react";
import {render, screen} from '@testing-library/react';
import Hero from "../Hero";
import '@testing-library/jest-dom';

test('should display loading before fetching has completed', ()=>{
    render(<Hero/>)

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Loading');
})