import React from 'react';
import { calculateRewards } from '../utils/rewardsCalculator';
import { getMonthName, getYear } from '../utils/dateHelpers';
import log from '../utils/logger'; 

const UserMonthlyRewards = ({ transactions }) => {
  try {
    // Log the transactions data received
    log.debug('Transactions data received for monthly rewards:', transactions);

    // Aggregate rewards by customer, month, and year
    const monthlyRewards = transactions.reduce((acc, transaction) => {
      const { customerId, customerName, purchaseDate, price } = transaction;

      // Log each transaction being processed
      log.debug('Processing transaction for monthly rewards:', transaction);

      const month = getMonthName(purchaseDate);
      const year = getYear(purchaseDate);
      const key = `${customerId}-${month}-${year}`;

      if (!acc[key]) {
        acc[key] = {
          customerId,
          name: customerName,
          month,
          year,
          rewardPoints: 0,
        };
        // Log when a new monthly record is added
        log.debug(`Adding new monthly record for customer: ${customerName}, Month: ${month}, Year: ${year}`);
      }

      acc[key].rewardPoints += calculateRewards(price);

      // Log the calculated points for the transaction
      log.debug(`Customer ${customerName} earned ${calculateRewards(price)} points for transaction of $${price} in ${month}, ${year}`);

      return acc;
    }, {});

    // Log the final aggregated monthly rewards
    log.debug('Monthly rewards calculated:', monthlyRewards);

    return (
      <div>
        <h2>User Monthly Rewards</h2>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(monthlyRewards).map((reward) => (
              <tr key={`${reward.customerId}-${reward.month}-${reward.year}`}>
                <td>{reward.customerId}</td>
                <td>{reward.name}</td>
                <td>{reward.month}</td>
                <td>{reward.year}</td>
                <td>{reward.rewardPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    // Log and display error if an exception occurs
    log.error('Error calculating user monthly rewards:', error);
    return <div>Error calculating user monthly rewards. Please try again later.</div>;
  }
};

export default UserMonthlyRewards;
