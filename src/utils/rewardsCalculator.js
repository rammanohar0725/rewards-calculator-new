import log from 'loglevel';

export function calculateRewards(price) {
  try {
    // Log the input price
    log.debug('Calculating rewards for price:', price);

    // Type checking: Ensure the price is a number
    if (typeof price !== 'number' || isNaN(price)) {
      throw new Error(`Invalid price type: ${typeof price}. Expected a number.`);
    }

    let points = 0;

    if (price > 100) {
      points += 50; // 1 point per dollar for $50-$100
      points += (price - 100) * 2; // 2 points per dollar over $100
    } else if (price > 50) {
      points += price - 50; // 1 point per dollar for $50-$price
    }

    // Log the calculated points
    log.debug(`Calculated reward points for price $${price}: ${points}`);

    return points;
  } catch (error) {
    // Log the error and rethrow it
    log.error('Error in calculateRewards:', error);
    throw error;
  }
}
