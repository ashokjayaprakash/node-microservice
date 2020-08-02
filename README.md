# node-microservice
A micro service project with JWT authentication uisng express 

## Implementation Detail

### file-generator

The project to generate file based on given input

### microservice-integration

The following service is implemented using two modules which is user and order

 - user-management - To manage the User API
 - order-management - To manage the user orders

#### Tech Stack
 - Express.js
 - Mongodb

#### Features
 - Global configuration for logging
 - Configurable retry counter for order-management service  
 - order-management service  internally invokes user management for validating the session

## Todo

 [ ] Static Code Analysis
 [ ] Unite Test 









