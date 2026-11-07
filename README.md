# Places of Interest

A full-stack web application developed as part of the Web Application Development module at South East Technological University (SETU).

The application allows users to create, view, update and delete places of interest. Each place can contain a name, description, category, geographical location and photograph. Places can also be viewed on an interactive map.

The application is developed using Node.js and Hapi, with Handlebars templates and Bulma for the user interface. MongoDB is used for persistent storage, with MongoDB Atlas providing cloud database hosting.

## Features

### User Management
- User registration and login
- Cookie-based authentication using Hapi
- User profile settings
- Administrator role and protected dashboard
- Administrator ability to view and remove registered users

### Places of Interest
- Create, view, edit and delete places
- Store place names, descriptions and geographical coordinates
- Organise places into categories
- Filter places by category
- Display places on an interactive Leaflet map
- Upload photographs using Cloudinary
- Display uploaded photographs alongside place information

### REST API
- RESTful endpoints for accessing and managing places
- JSON Web Token (JWT) authentication
- API documentation using Swagger/OpenAPI
- Automated API testing using Mocha, Chai and Axios

### Administration
- Administrator-only dashboard
- View registered users
- View existing places
- Display total user and place counts
- Remove user accounts

## Technologies

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Hapi | Web application framework |
| Handlebars | Server-side HTML templates |
| Bulma | CSS framework |
| Joi | Input validation |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| MongoDB Atlas | Cloud database hosting |
| Leaflet | Interactive maps |
| Cloudinary | Image hosting and management |
| JWT | API authentication |
| Swagger/OpenAPI | API documentation |
| Mocha | Automated testing |
| Chai | Test assertions |
| Axios | HTTP requests and API testing |
| Render | Cloud application deployment |
| Git and GitHub | Version control and releases |

## Installation

### Prerequisites

The following are required:

- Node.js and npm
- Git
- MongoDB Atlas database
- Cloudinary account

### Clone the Repository


git clone git@github.com:pmooney20-art/webapp1.git
cd webapp1


Alternatively, clone using HTTPS:


git clone https://github.com/pmooney20-art/webapp1.git
cd webapp1


### Install Dependencies


npm install


### Environment Variables

Create a `.env` file in the project root.

Configure the environment variables used by the application:


db=mongodb+srv://<username>:<password>@<cluster>/<database>
cookie_password=<cookie-secret>

CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

JWT_SECRET=<jwt-secret>


The database connection variable and cookie secret name must match those used by the application configuration.

Environment variables contain sensitive credentials and must not be committed to GitHub.

### Start the Application

For development:


npm run dev


The application will normally be available at:

http://localhost:3000

The server uses the `PORT` environment variable when provided by the hosting environment and otherwise defaults to port 3000.


## Database

MongoDB is used to store application data.

The application includes two primary collections:

### Users

Stores registered account information, including:

- First name
- Last name
- Email address
- Password credentials
- User role

### Places

Stores information about places of interest, including:

- Name
- Description
- Category
- Location
- Latitude and longitude
- Image URL
- Cloudinary image identifier

The application was developed using several storage implementations, including in-memory storage, LowDB and MongoDB.

MongoDB Atlas is used for the deployed application.

## REST API

The application provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/places` | Retrieve all places |
| GET | `/api/places/{id}` | Retrieve a place by ID |
| POST | `/api/places` | Create a place |
| DELETE | `/api/places/{id}` | Delete a place |
| POST | `/api/users/authenticate` | Authenticate a user and obtain a JWT |

### JWT Authentication

API clients authenticate by sending valid user credentials to:


POST /api/users/authenticate


Example request body:


{
  "email": "user@example.com",
  "password": "example-password"
}


A successful authentication returns a signed JSON Web Token.

The token can then be included in subsequent API requests:


Authorization: Bearer <token>


The server verifies the token before allowing access to protected endpoints.

### API Documentation

Swagger/OpenAPI documentation is provided through the application.

The documentation describes the API endpoints, request methods and supported operations.

## Testing

The application uses Mocha and Chai for automated testing, with Axios for HTTP-based API tests.

Tests cover the application's models and REST API.

### Run All Tests

npm test


### Run Model Tests


npm run testmodels






## Deployment

### Render

The Node.js/Hapi application is deployed using Render.

Render connects to the GitHub repository and can automatically deploy new commits pushed to the configured branch.

The application uses the following server configuration:


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
});


This allows the application to use the port provided by Render while retaining port 3000 for local development.

### MongoDB Atlas

MongoDB Atlas provides the cloud-hosted database.

The application connects to Atlas using an environment variable containing the MongoDB connection string.

### Cloudinary

Cloudinary is used to host uploaded place photographs.

When a user uploads an image:

1. The application validates the uploaded file.
2. The image is uploaded to Cloudinary.
3. Cloudinary returns an image URL and public identifier.
4. These values are saved to the corresponding place in MongoDB.
5. The photograph is displayed on the place's details page and in the places list.

## Version Control

Git is used for version control, with the repository hosted on GitHub.

Development progress is recorded through commits covering individual features and milestones.

### Tagged Releases

| Version | Description |
|---|---|
| v0.1.0 | Core Places Application |
| v0.2.0 | User Authentication and Interactive Maps |
| v0.3.0 | MongoDB, REST API, Automated Tests and Swagger |
| v0.4.0 | Cloud Deployment and Cloudinary Image Uploads |
| v1.0.0 | Administrator Dashboard and JWT Authentication |

These releases identify significant stages in the application's development.

## Security

The application includes several security mechanisms:

- Cookie-based authentication for website sessions
- JWT authentication for REST API access
- Administrator role checks for protected routes
- Joi validation of submitted data
- File type and size validation for image uploads
- Environment variables for database credentials and API secrets

The application is an academic project and should undergo further security review before production use.

## Future Improvements

Possible future enhancements include:

- Additional user account management
- Improved search and filtering
- User favourites
- More detailed place information
- Additional map functionality
- Improved image management
- Additional automated tests

## Author

Developed by Paul Mooney as part of the Web Application Development module at South East Technological University.

**GitHub Repository:** https://github.com/pmooney20-art/webapp1