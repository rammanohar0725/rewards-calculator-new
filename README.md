# Rewards Program Application

This project is a React application that displays user transactions and calculates reward points based on purchase amounts. It includes multiple components to show transactions, user monthly rewards, and total rewards for each customer.

## Features

- **Transaction Table:** Displays a list of user transactions.
- **User Monthly Rewards:** Shows reward points earned by each user for each month.
- **Total Rewards:** Aggregates and displays total reward points for each customer.
- **Routing:** Uses `react-router-dom` to navigate between different views.


## Technologies Used

- React
- React Router
- React Testing Library
- Jest
- loglevel

## Installation and Setup

Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

Clone the repository to your local machine using:

git clone <repository-url>
cd rewards-calculator

## Install Dependencies

npm install

## Running Tests

npx jest test

## Application Starting

npm start



## Screen Shots

![alt text](image-4.png)


![alt text](image-5.png)


![alt text](image-6.png)


## Folder Structure

![alt text](image-3.png)








## Test Cases Explanation

##########################################################################################################################################################

Test Case Document for TotalRewards Component
Component: TotalRewards
Purpose:
The TotalRewards component displays a table of customers and their respective total reward points based on the provided transaction data. It logs transaction processing and handles errors during reward calculations.

Test Cases
1. Rendering Table Headers
Test Case ID: TR01
Description: Verify that the component renders the table headers correctly.
Preconditions: The TotalRewards component is rendered with a valid transactions array.
Test Steps:
Render the TotalRewards component.
Check if the table headers "Customer Name" and "Reward Points" are present in the document.
Expected Result: The table headers "Customer Name" and "Reward Points" should be displayed.

2. Calculating and Displaying Total Rewards
Test Case ID: TR02
Description: Verify that the component calculates and displays total rewards for each customer correctly.
Preconditions: The TotalRewards component is rendered with a valid transactions array.
Test Steps:
Render the TotalRewards component.
Verify that each customer's name and their calculated reward points are displayed correctly.
Expected Result: The component should display "Amit" with 2250 reward points and "Emily" with 1350 reward points.


3. Logging Transactions and Reward Processing
Test Case ID: TR03
Description: Verify that the component logs the processing of transactions and the calculation of total rewards.
Preconditions: The TotalRewards component is rendered with a valid transactions array.
Test Steps:
Render the TotalRewards component.
Check that the logger has been called with appropriate debug messages, including the transaction data and calculated rewards.
Expected Result: Logger should output debug messages indicating the processing of each transaction and the calculation of total rewards.

4. Handling Errors During Reward Calculation
Test Case ID: TR04
Description: Verify that the component handles exceptions during reward calculation and displays an error message.
Preconditions: The calculateRewards function is mocked to throw an error for testing purposes.
Test Steps:
Render the TotalRewards component with the calculateRewards function mocked to throw an error.
Verify that an error message is displayed in the component.
Check that the logger has logged the error message.
Expected Result: The component should display an error message "Error calculating total rewards. Please try again later." and log the error.

##########################################################################################################################################################


Test Case Document for TransactionTable Component
Component: TransactionTable
Purpose:
The TransactionTable component is responsible for displaying transaction data in a tabular format, including transaction details, customer information, and reward points.


Test Cases
1. Rendering Table Headers
Test Case ID: TT01
Description: Verify that the table headers are rendered correctly.
Preconditions: The TransactionTable component is rendered with a valid transactions array.
Test Steps:
Render the TransactionTable component.
Verify that the following table headers are present in the document:
"Transaction ID"
"Customer ID"
"Customer Name"
"Purchase Date"
"Month"
"Product Purchased"
"Price"
"Reward Points"
Expected Result: All specified table headers should be displayed in the document.


2. Rendering Transaction Data
Test Case ID: TT02
Description: Verify that the transaction data is rendered correctly for each transaction.
Preconditions: The TransactionTable component is rendered with a valid transactions array.
Test Steps:
Render the TransactionTable component.
Use screen.debug() to print the DOM structure (optional, for debugging purposes).
Verify the following transaction details are displayed:
Transaction ID: "t001"
Customer Name: "Amit"
Product Purchased: "Laptop"
Price: "$1200.00"
Reward Points: "2250"
Transaction ID: "t002"
Customer Name: "Emily"
Product Purchased: "Smartphone"
Price: "$800.00"
Reward Points: "1350"
Verify the month names ("December" and "January") are rendered if uncommented.
Expected Result: All specified transaction details should be displayed for each transaction.

##########################################################################################################################################################



Test Case Document for UserMonthlyRewards Component
Component: UserMonthlyRewards
Purpose:
The UserMonthlyRewards component aggregates and displays the monthly reward points for each customer based on their transaction data. It logs the processing of transactions and handles errors during reward calculations.

Test Cases
1. Rendering Table Headers
Test Case ID: UMR01
Description: Verify that the table headers are rendered correctly.
Preconditions: The UserMonthlyRewards component is rendered with a valid transactions array.
Test Steps:
Render the UserMonthlyRewards component.
Verify that the following table headers are present in the document:
"Customer ID"
"Name"
"Month"
"Year"
"Reward Points"
Expected Result: All specified table headers should be displayed in the document.


2. Aggregating and Displaying Monthly Rewards
Test Case ID: UMR02
Description: Verify that the component aggregates and displays monthly rewards for each customer correctly.
Preconditions: The UserMonthlyRewards component is rendered with a valid transactions array.
Test Steps:
Render the UserMonthlyRewards component.
Use screen.debug() to print the DOM structure (optional, for debugging purposes).
Verify the following details for each customer:
For "Amit" (Customer ID: "c001"):
Month: "December"
Year: "2023"
Reward Points: "2250"
For "Emily" (Customer ID: "c002"):
Month: "January"
Year: "2024"
Reward Points: "1350"
Expected Result: The component should display the correct monthly rewards for each customer.



3. Calling Utility Functions with Correct Arguments
Test Case ID: UMR03
Description: Verify that the utility functions calculateRewards, getMonthName, and getYear are called with correct arguments.
Preconditions: The UserMonthlyRewards component is rendered with a valid transactions array.
Test Steps:
Render the UserMonthlyRewards component.
Verify that calculateRewards is called with each transaction's price.
Verify that getMonthName and getYear are called with each transaction's purchase date.
Expected Result: The utility functions should be called with the correct arguments as per the transaction data.




4. Logging Transactions and Rewards Processing
Test Case ID: UMR04
Description: Verify that the component logs the processing of transactions and the calculation of monthly rewards.
Preconditions: The UserMonthlyRewards component is rendered with a valid transactions array.
Test Steps:
Render the UserMonthlyRewards component.
Check that the logger outputs debug messages for receiving transaction data and processing each transaction.
Expected Result: Logger should output debug messages indicating the processing of each transaction and the calculation of monthly rewards.

5. Handling Errors During Reward Calculation
Test Case ID: UMR05
Description: Verify that the component handles exceptions during reward calculation and displays an error message.
Preconditions: The calculateRewards function is mocked to throw an error for testing purposes.
Test Steps:
Render the UserMonthlyRewards component with the calculateRewards function mocked to throw an error.
Verify that an error message is displayed in the component.
Check that the logger has logged the error message.
Expected Result: The component should display an error message "Error calculating user monthly rewards. Please try again later." and log the error.