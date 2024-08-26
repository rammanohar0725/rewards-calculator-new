import log from 'loglevel';

export function calculateRewards(price) {
  try {
    log.debug('Calculating rewards for price:', price); // Log the input price

    if (typeof price !== 'number' || isNaN(price)) { // Type checking: Ensure the price is a number
      throw new Error(`Invalid price type: ${typeof price}. Expected a number.`);
    }

    let points = 0;

    if (price > 100) {
      points += (price - 100) * 2 + 50; // 2 points per dollar over $100 + 50 base points
    } else if (price > 50) {
      points += price - 50; // 1 point per dollar for $50-$100
    } else if (price >= 25 && price < 50) {
      points += Math.floor((price - 25) * 0.4); // Fractional points for $25 to just under $50
    }

    log.debug(`Calculated reward points for price $${price}: ${points}`); // Log the calculated points

    return Math.round(points); // Ensure points are returned as whole numbers
  } catch (error) {
    log.error('Error in calculateRewards:', error); // Log the error and rethrow it
    throw error;
  }
}