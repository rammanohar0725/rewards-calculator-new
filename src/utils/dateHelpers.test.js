import { getMonthName, getYear } from './dateHelpers';

describe('Date Helpers', () => {
  it('returns correct month name for a given date string', () => {
    expect(getMonthName('2023-12-15')).toBe('December');
    expect(getMonthName('2024-02-14')).toBe('February');
  });

  it('returns correct year for a given date string', () => {
    expect(getYear('2023-12-15')).toBe(2023);
    expect(getYear('2024-02-14')).toBe(2024);
  });
});
