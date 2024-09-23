import React from 'react';
import { CalculateRewards  } from './CalculateRewards';
import log from '../../utils/Logger'; 
const TotalRewards = ({ transactions }) => {
  try {
    // Log the transactions data received
    log.debug('Transactions data received for total rewards:', transactions);

    // Aggregate total rewards by customer
    const totalRewards = transactions.reduce((acc, transaction) => {
      const { customerId, customerName, price } = transaction;

      // Log each transaction being processed
      log.debug('Processing transaction:', transaction);

      if (!acc[customerId]) {
        acc[customerId] = {
          name: customerName,
          rewardPoints: 0,
        };
        // Log when a new customer is added
        log.debug(`Adding new customer: ${customerName} with ID: ${customerId}`);
      }

      // Calculate reward points for the current transaction
      const points = CalculateRewards(price);
      acc[customerId].rewardPoints += points;

      // Log the calculated points
      log.debug(`Customer ${customerName} earned ${points} points for transaction of $${price}`);

      return acc;
    }, {});

    // Log the final aggregated rewards
    log.debug('Total rewards calculated:', totalRewards);

    return (
      <div>
        <h2>Total Rewards</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(totalRewards).map((reward, index) => (
              <tr key={index}>
                <td>{reward.name}</td>
                <td>{reward.rewardPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    // Log and display error if an exception occurs
    log.error('Error calculating total rewards:', error);
    return <div>Error calculating total rewards. Please try again later.</div>;
  }
};

export default TotalRewards;
