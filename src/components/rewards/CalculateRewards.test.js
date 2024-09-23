
import { CalculateRewards } from './CalculateRewards';

// Mock loglevel methods
jest.mock('loglevel', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

describe('CalculateRewards', () => {
  it('should return 0 points for prices less than $25', () => {
    expect(CalculateRewards(24)).toBe(0); // No points should be awarded for prices below $25
  });

  it('should return correct fractional points for prices >= $25 and < $50', () => {
    expect(CalculateRewards(30)).toBe(2); // Math.floor((30 - 25) * 0.4) = 2
    expect(CalculateRewards(40)).toBe(6); // Math.floor((40 - 25) * 0.4) = 6
  });

  it('should return correct points for prices between $50 and $100', () => {
    expect(CalculateRewards(75)).toBe(25); // 75 - 50 = 25
  });

  it('should return correct points for prices over $100', () => {
    expect(CalculateRewards(150)).toBe(150); // (150 - 100) * 2 + 50 = 150
  });
  it('should calculate fractional points correctly for prices >= $25 and < $50', () => {
    expect(CalculateRewards(30)).toBe(2); // Math.floor((30 - 25) * 0.4) = 2
  });

  it('should round points correctly', () => {
    expect(CalculateRewards(135.5)).toBe(121); // (135.5 - 100) * 2 + 50 = 121
  });

  it('throws an error for invalid input types', () => {
    expect(() => CalculateRewards('100')).toThrow('Invalid price type: string. Expected a number.');
  });

  it('handles NaN as input', () => {
    expect(() => CalculateRewards(NaN)).toThrow('Invalid price type: number. Expected a number.');
  });

   // Additional test cases
   it('should return 0 points for a price of exactly $0', () => {
    expect(CalculateRewards(0)).toBe(0);
  });

  it('should return correct points for a price of exactly $25', () => {
    expect(CalculateRewards(25)).toBe(0); // No points for exactly $25
  });

  it('should return correct points for a price of exactly $50', () => {
    expect(CalculateRewards(50)).toBe(0); // No points for exactly $50
  });

 
  it('should handle negative prices gracefully', () => {
    expect(CalculateRewards(-10)).toBe(0); // No points for negative prices
  });

  it('should handle very large prices correctly', () => {
    expect(CalculateRewards(1000)).toBe(1850); // (1000 - 100) * 2 + 50 = 1850
  });

  it('should handle fractional prices correctly', () => {
    expect(CalculateRewards(49.99)).toBe(9); // Math.floor((49.99 - 25) * 0.4) = 9
  });

  it('should handle edge case of price just below $25', () => {
    expect(CalculateRewards(24.99)).toBe(0); // No points for prices below $25
  });

  it('should handle edge case of price just below $50', () => {
    expect(CalculateRewards(49.99)).toBe(9); // Math.floor((49.99 - 25) * 0.4) = 9
  });


});