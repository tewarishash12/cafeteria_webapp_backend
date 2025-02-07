# Cafeteria Web App Backend

This repository contains the backend code for the cafeteria web application, structured into two separate servers:
- **Auth Server**: Handles authentication-related operations.
- **Main Server**: Manages the core functionalities like dish management, counters, and user interactions.

## Installation
To set up the project, follow these steps:

### 1. Clone the Repository
```sh
https://github.com/tewarishash12/cafeteria_webapp_backend.git
cd cafeteria_webapp_backend
```

### 2. Install Dependencies
#### Auth Server
```sh
cd auth_server
npm install
```

#### Main Server
```sh
cd main_server
npm install
```

## Running the Servers

### Start the Auth Server
```sh
cd auth_server
npm run auth
```

### Start the Main Server
```sh
cd main_server
npm start
```

## API Endpoints
### Authentication Server
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate user

### Main Server
- `GET /dish/alldishes` - Retrieve available dishes
- `POST /cart/addtocart` - Add dish to cart: (For loggedin user only)
- `POST /counter` - Adding counters (for admins only)

## Contributors
- **[Shashwat Tewari](https://github.com/tewarishash12)** - Developer

---
Feel free to modify this README to suit your project structure and details!

