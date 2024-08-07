
import log from 'loglevel';
import { calculateRewards } from './rewardsCalculator';

// Mock loglevel methods
jest.mock('loglevel', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

describe('calculateRewards', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calculates rewards correctly for prices over 100', () => {
    expect(calculateRewards(120)).toBe(90); // 50 for $50-$100 + 40*2 for $120
    expect(calculateRewards(150)).toBe(150); // 50 for $50-$100 + 100*2 for $150
  });

  it('calculates rewards correctly for prices between 50 and 100', () => {
    expect(calculateRewards(70)).toBe(20); // 20 for $70-$50
    expect(calculateRewards(100)).toBe(50); // 50 for $100-$50
  });

  it('returns 0 for prices less than or equal to 50', () => {
    expect(calculateRewards(50)).toBe(0);
    expect(calculateRewards(30)).toBe(0);
  });

  it('throws an error for invalid input types', () => {
    expect(() => calculateRewards('abc')).toThrow('Invalid price type: string. Expected a number.');
    expect(() => calculateRewards(null)).toThrow('Invalid price type: object. Expected a number.');
    expect(() => calculateRewards(undefined)).toThrow('Invalid price type: undefined. Expected a number.');
  });

  it('logs debug messages for valid inputs', () => {
    calculateRewards(120);
    expect(log.debug).toHaveBeenCalledWith('Calculating rewards for price:', 120);
    expect(log.debug).toHaveBeenCalledWith('Calculated reward points for price $120: 90');
  });

  it('logs error messages for invalid inputs', () => {
    expect(() => calculateRewards('abc')).toThrow();
    expect(log.error).toHaveBeenCalledWith('Error in calculateRewards:', expect.any(Error));
  });
});
