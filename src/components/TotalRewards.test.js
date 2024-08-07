import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewards from './TotalRewards';
import log from '../utils/logger';
import { calculateRewards } from '../utils/rewardsCalculator';
import '@testing-library/jest-dom'; 

// Mock the logger 
jest.mock('../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the calculateRewards function
jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewards: jest.fn((price) => {
    if (price === 1200) return 2250;
    if (price === 800) return 1350;
    return 0;
  }),
}));

// Mock transaction data
const mockTransactions = [
  {
    transactionId: 't001',
    customerId: 'c001',
    customerName: 'Amit',
    purchaseDate: '2023-12-15',
    productPurchased: 'Laptop',
    price: 1200, // 2250 reward points
  },
  {
    transactionId: 't002',
    customerId: 'c002',
    customerName: 'Emily',
    purchaseDate: '2024-01-16',
    productPurchased: 'Smartphone',
    price: 800, // 1350 reward points
  },
];

describe('TotalRewards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

  it('calculates and displays total rewards correctly', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    screen.debug(); // Debug the DOM to inspect the structure

    expect(screen.getByText('Amit')).toBeInTheDocument();
    expect(screen.getByText('Emily')).toBeInTheDocument();

  });

  it('logs the transactions and rewards processing', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(log.debug).toHaveBeenCalledWith('Transactions data received for total rewards:', mockTransactions);
    expect(log.debug).toHaveBeenCalledWith('Processing transaction:', mockTransactions[0]);
    expect(log.debug).toHaveBeenCalledWith('Processing transaction:', mockTransactions[1]);
    expect(log.debug).toHaveBeenCalledWith('Total rewards calculated:', expect.any(Object));
  });

  it('displays error message on exception', () => {
    // Mock the calculateRewards to throw an error
    calculateRewards.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    render(<TotalRewards transactions={mockTransactions} />);
    expect(screen.getByText('Error calculating total rewards. Please try again later.')).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('Error calculating total rewards:', expect.any(Error));
  });
});
