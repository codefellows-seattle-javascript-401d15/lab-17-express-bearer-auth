# Lab 17 - cfgram API - Bearer Authentication
This is a lab assignment in CF401 where we create an API that is used for creating users and galleries.

### Setup
- Clone this repo
- Run ```npm install``` in your terminal (make sure you're at the lab-steven filepath in the repo)
- Setup environment variables in a .env file for your PORT, MONGOD_URI, APP_SECRET

### Methods and Routes
##### User
- ```POST /api/signup```        : requires *username*, *email*, and *password*. Returns Token.
- ```GET /api/signin```         : requires {<username>:<password>}. Returns Token.
##### Gallery
- ```POST /api/gallery```       : requires *name* and *desc*, and 'Authorization:Bearer <token>'. Returns the Gallery.
- ```GET /api/gallery/:id```    : requires *gallery id* in the url as a parameter and 'Authorization:Bearer <token>'. Returns the Gallery.
- ```PUT /api/gallery/:id```    : requires any updates to *name* or *desc* and 'Authorization:Bearer <token>'. Returns updated Gallery.
- ```DELETE /api/gallery/:id``` : requires *gallery id* in the url as a parameter and 'Authorization:Bearer <token>'. Returns 204 status response.

### Scripts
- ```npm run lint```            : lints the code
- ```npm test```                : runs tests
- ```npm run debug```           : runs nodemon server with debug active
- ```npm start```               : runs server
