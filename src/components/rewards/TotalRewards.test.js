import React from 'react';
import { render, screen } from '@testing-library/react'; // No need for act in simple rendering tests
import '@testing-library/jest-dom'; // Correct import
import TotalRewards from './TotalRewards';
import { CalculateRewards } from './CalculateRewards';
import log from '../../utils/Logger';

// Mock the CalculateRewards function
jest.mock('./CalculateRewards', () => ({
  CalculateRewards: jest.fn(),
}));

// Mock the log module
jest.mock('../../utils/Logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

describe('TotalRewards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Suppress console.error and console.warn for these tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error and console.warn after the tests
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  it('renders correctly with given transactions', () => {
    CalculateRewards.mockImplementation((price) => price * 2);

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: 50 },
      { customerId: 2, customerName: 'Jane Smith', price: 100 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('renders correctly with empty transactions', () => {
    render(<TotalRewards transactions={[]} />);

    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('handles errors correctly', () => {
    const error = new Error('Test error');
    CalculateRewards.mockImplementation(() => {
      throw error;
    });

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: 50 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(log.error).toHaveBeenCalledWith('Error calculating total rewards:', error);
    expect(screen.getByText('Error calculating total rewards. Please try again later.')).toBeInTheDocument();
  });

  it('renders correctly with multiple transactions for different customers', () => {
    CalculateRewards.mockImplementation((price) => price * 2);

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: 50 },
      { customerId: 2, customerName: 'Jane Smith', price: 100 },
      { customerId: 3, customerName: 'Alice Johnson', price: 150 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
  });

  it('handles transactions with zero price correctly', () => {
    CalculateRewards.mockImplementation((price) => price * 2);

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: 0 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles transactions with negative price correctly', () => {
    CalculateRewards.mockImplementation((price) => price * 2);

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: -50 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('-100')).toBeInTheDocument();
  });

  it('handles transactions with large price values correctly', () => {
    CalculateRewards.mockImplementation((price) => price * 2);

    const transactions = [
      { customerId: 1, customerName: 'John Doe', price: 1000000 },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2000000')).toBeInTheDocument();
  });
});
