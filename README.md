# API_Ex
1. Set up the Project
. Initialize a New Project:
Create a new Node.js project and install the necessary dependencies:
express, mongoose, bcryptjs, jsonwebtoken, dotenv.
Set up the basic folder structure:
server.js – Main server file.
models/ – For defining Mongoose models.
routes/ – For defining API routes.
controllers/ – For handling the business logic.
middleware/ – For authentication and authorization logic.
.env – For storing environment variables (JWT secret, MongoDB URI).
.gitignore – To ignore node_modules and .env from version control.
. Configure MongoDB and dotenv:
Set up a MongoDB database URI in .env and load environment variables using dotenv.
2. Implement User Authentication (Register & Login)
. User Model:
Define a User schema with the following fields:
name (String)
email (String, unique)
password (String)
role (Enum: admin, moderator, user).
Ensure that the password is not stored in plain text; use bcryptjs to hash the password during
registration.
. User Registration:
Create a route to register a new user (POST /users/register).
Hash the password before saving the user to the database.
Save the user with the provided name, email, password, and role.
1/3README.md
2024-11-24
. User Login:
Create a route to log in (POST /users/login).
Validate the provided credentials (email and password).
If valid, generate a JWT token and return it in the response.
. Role-Based Access Control:
Create middleware to check the role of the logged-in user.
Ensure that only admin users can delete other users, moderators can update products, and
users can only read products.
3. Implement Product Management
. Product Model:
Define a Product schema with the following fields:
name (String)
price (Number)
description (String).
. Product Routes:
GET /products – Any authenticated user can read products.
PUT /products/:id – Only moderators can update product details.
DELETE /products/:id – Only admin can delete products.
4. Implement Middleware for Authentication & Authorization
. JWT Authentication Middleware:
Create middleware to verify the JWT token sent in the Authorization header of requests.
If the token is valid, add the user object to the req (request) object for access in other routes.
. Role Middleware:
Create a middleware that checks the userʼs role (admin, moderator, user) and ensures they
have the necessary permission to perform actions.
Admins can delete users and products, moderators can update products, and users can only
read products.
5. Testing the API
Testing with Postman:
Test all the endpoints with Postman to ensure they behave as expected:
Register and login users.
Perform CRUD operations on products based on user roles.
