import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMonthlyRewards from './UserMonthlyRewards';
import log from '../utils/logger';
import { calculateRewards } from '../utils/rewardsCalculator';
import { getMonthName, getYear } from '../utils/dateHelpers';
import '@testing-library/jest-dom'; 

// Mock the logger 
jest.mock('../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the utility functions
jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewards: jest.fn((price) => {
    if (price === 1200) return 2250;
    if (price === 800) return 1350;
    return 0;
  }),
}));

jest.mock('../utils/dateHelpers', () => ({
  getMonthName: jest.fn((date) => {
    if (date === '2023-12-15') return 'December';
    if (date === '2024-01-16') return 'January';
    return 'Unknown';
  }),
  getYear: jest.fn((date) => {
    if (date === '2023-12-15') return 2023;
    if (date === '2024-01-16') return 2024;
    return 'Unknown';
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

describe('UserMonthlyRewards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    const headers = [
      'Customer ID',
      'Name',
      'Month',
      'Year',
      'Reward Points',
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('aggregates and displays monthly rewards correctly', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    screen.debug(); // Debug the DOM to inspect the structure

    expect(screen.getByText('c001')).toBeInTheDocument();
    expect(screen.getByText('Amit')).toBeInTheDocument();
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2250')).toBeInTheDocument(); // Amit's reward points

    expect(screen.getByText('c002')).toBeInTheDocument();
    expect(screen.getByText('Emily')).toBeInTheDocument();
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('1350')).toBeInTheDocument(); // Emily's reward points
  });

  it('calls calculateRewards, getMonthName, and getYear with correct arguments', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(calculateRewards).toHaveBeenCalledWith(1200);
    expect(calculateRewards).toHaveBeenCalledWith(800);
    expect(getMonthName).toHaveBeenCalledWith('2023-12-15');
    expect(getMonthName).toHaveBeenCalledWith('2024-01-16');
    expect(getYear).toHaveBeenCalledWith('2023-12-15');
    expect(getYear).toHaveBeenCalledWith('2024-01-16');
  });

  it('logs transactions and rewards processing', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(log.debug).toHaveBeenCalledWith('Transactions data received for monthly rewards:', mockTransactions);
    expect(log.debug).toHaveBeenCalledWith('Processing transaction for monthly rewards:', mockTransactions[0]);
    expect(log.debug).toHaveBeenCalledWith('Processing transaction for monthly rewards:', mockTransactions[1]);
  });

  it('displays error message on exception', () => {
    // Mock the calculateRewards to throw an error
    calculateRewards.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(screen.getByText('Error calculating user monthly rewards. Please try again later.')).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('Error calculating user monthly rewards:', expect.any(Error));
  });
});
