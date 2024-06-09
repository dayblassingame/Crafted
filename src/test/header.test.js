import React from 'react';
import {expect, test} from '@jest/globals';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import Header from '../Header';
import {HashRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

describe ('should render header', ()=>{ 
  afterEach(cleanup)

  test('renders Header component by default', () => {
    const { getByTestId } = render(
      <HashRouter>
          <Header/>
          <main id='main'/>
      </HashRouter>
    );
    expect(getByTestId('header')).toBeInTheDocument();
  });

  test.failing('navMenu should not be visible before navBtn is clicked', ()=>{
      const { getByTestId } = render(
        <HashRouter>
          <Header/>
          <main id='main'/>
        </HashRouter>
      );
      expect(getByTestId('navMenu')).toBeInTheDocument();
  })

  test('navMenu should display when navBtn is clicked', ()=>{
    const { getByTestId } = render(
      <HashRouter>
        <Header/>
        <main id='main'/>
      </HashRouter>
    );
    fireEvent.click(getByTestId('navMenuBtn'))
    expect(getByTestId('navMenu')).toBeInTheDocument();
  })

  test.failing('nav should close when search btn is clicked', ()=>{
    const { getByTestId } = render(
      <HashRouter>
        <Header />
        <main id='main'/>
      </HashRouter>
    );
    fireEvent.click(getByTestId('navMenuBtn'))
    fireEvent.click(getByTestId('searchBtn'))
    expect(getByTestId('navMenu')).toBeInTheDocument();
  })
})