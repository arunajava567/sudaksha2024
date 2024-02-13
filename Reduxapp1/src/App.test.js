import React from 'react';
import App from './App';


test('Click Load users button  to load use details', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Click Load users button  to load use details/i);
  expect(linkElement).toBeInTheDocument();
});























/*
describe('true is truthy and false is falsy', () => {
    test('true is truthy', () => {
      expect(true).toBe(true);
    });
   
    test('false is falsy', () => {
      expect(false).toBe(false);
    });
  });

  */