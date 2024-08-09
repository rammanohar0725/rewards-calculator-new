import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import UserMonthlyRewards from './UserMonthlyRewards';
import { calculateRewards } from '../utils/rewardsCalculator';
import log from '../utils/logger';

// Mock the logger to avoid actual logging during tests
jest.mock('../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the rewards calculator
jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewards: jest.fn(price => Math.floor(price * 0.1)), // Simple mock for testing
}));

// Mock the date helpers
jest.mock('../utils/dateHelpers', () => ({
  getMonthName: jest.fn(date => new Date(date).toLocaleString('default', { month: 'long' })),
  getYear: jest.fn(date => new Date(date).getFullYear()),
}));

const mockTransactions = [
  {
    transactionId: 't001',
    customerId: 'c001',
    customerName: 'Amit',
    purchaseDate: '2024-06-15',
    productPurchased: 'Laptop',
    price: 800,
  },
];

describe('UserMonthlyRewards Component', () => {
  it('displays error message on exception', () => {
    // Mock the calculateRewards to throw an error
    calculateRewards.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Render the component
    render(<UserMonthlyRewards transactions={mockTransactions} />);

  });
});

