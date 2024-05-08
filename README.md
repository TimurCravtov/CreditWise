# CreditWise :: Spend you money wisely
## An app for calculating credit for different banks in Moldova

> [!NOTE]
> DSA project developed by FAF-231 I-st year student Timur Cravtov

<img alt="CreditWise logo" height="200" src="client/src/static/creditwise_logo.png" title="Text to show on mouseover" width="auto"/>

The purpose of this project work was to use the obtained knowledge of C/C++ programming at DSA course at university in order to develop a useful program/set of programs to solve a real-life problem

_The task was the following_: The solution must calculate the final price of some products / services purchased through bank lending with a wide range of offers (conditions)

## Functionality

The app is able to calculate the amount of money one has to pay through the bank lending. Each bank has a list of offers with their DAE, minimum and maximum loan amount and loan term. The data given by the input form is processed by server which returns monthly payment and total payment. 

Also, it allows the user to calculate a general loan by introducing the DAE, amount of money and the term. 

## Tech stack

The solution used *crow.h* C++ backend library for server-side and *React* framework for client-side.

## How to use

Install *crow.h* library following the [instructions](https://crowcpp.org/master/getting_started/setup/linux/)

Install *Node.js* for npm package manager. 

Clone this repository 

Go to the directory *client*: `cd client` and run `npm start`. Run the backend through `main.cpp`

Enjoy. 

> [!WARNING]
> Not all the banks are displayed, but not all the conditions are displayed as well.