import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom'

afterEach(cleanup);

test('Should toggle navbar when hamburger menu is clicked',()=>{
    render(<Header/>);

    const navBtn = screen.getByTestId('navBtn');
    expect(navBtn).toBeInTheDocument();

    let navLinks = screen.queryAllByTestId('navLink');
    navLinks.forEach((link)=>{
        expect(link).not.toBeInTheDocument();
    })

    fireEvent.click(navBtn);

    navLinks = screen.queryAllByTestId('navLink');
    navLinks.forEach((link)=>{
        expect(link).toBeInTheDocument();
    })
    
})