import React from 'react';
import { render, screen } from '@testing-library/react'; // Use react-testing-library
import UseFetchTransaction from './UseFetchTransaction';
import log from '../../utils/logger';

// Mock the log utility to prevent actual logging
jest.mock('../../utils/Logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, description: 'Transaction 1', amount: 100 },
      { id: 2, description: 'Transaction 2', amount: 200 },
    ]),
  })
);

// Create a Test Component that uses the hook
const TestComponent = ({ timeoutDuration }) => {
  const { data, loading, error } = UseFetchTransaction(timeoutDuration);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {data.map((transaction) => (
        <li key={transaction.customerId}>
          {transaction.customerName} - ${transaction.price}
        </li>
      ))}
    </ul>
  );
};

describe('UseFetchTransaction Hook', () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Mock setTimeout to control the delay

    // Suppress console.error and console.warn for these tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers after the tests

    // Restore console.error and console.warn
    console.error.mockRestore();
    console.warn.mockRestore();
  });


  test('fetches data successfully after timeout', () => {
    render(<TestComponent />);

    // Fast-forward time to simulate the timeout
    jest.advanceTimersByTime(1000); // Default timeout of 1000ms

    // Check that data is displayed after timeout
   

    // Verify that the log messages were called
    expect(log.debug).toHaveBeenCalledWith('Fetching transactions data...');
    
  });
  

  
});
