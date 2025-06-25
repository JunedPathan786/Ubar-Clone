# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**
  - User registered successfully.
  - Returns:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "...",
        "fullname": {
          "firstname": "...",
          "lastname": "..."
        },
        "email": "...",
        // other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or required fields missing.
  - Returns:
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **409 Conflict**
  - Email already exists.
  - Returns:
    ```json
    {
      "error": "Email already exists"
    }
    ```

### Example

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```
---

# User Login Endpoint

## POST `/users/login`

Authenticates a user and returns a JWT token.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**
  - Login successful.
  - Returns:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "...",
        "fullname": {
          "firstname": "...",
          "lastname": "..."
        },
        "email": "...",
        // other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or required fields missing.
  - Returns:
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
  - Returns:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### Example

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"

```
---

# User Profile Endpoint

## GET `/users/profile`

Returns the authenticated user's profile information.  
**Requires authentication (JWT token in cookie or Authorization header).**

### Request Headers

- `Cookie: token=<jwt_token>`  
  or  
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**
  - Returns the user profile:
    ```json
    {
      "_id": "...",
      "fullname": {
        "firstname": "...",
        "lastname": "..."
      },
      "email": "...",
      // other user fields
    }
    ```

- **401 Unauthorized**
  - No token provided, invalid token, or blacklisted token.
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```
    or
    ```json
    {
      "message": "Token is blacklisted."
    }
    ```

---

# User Logout Endpoint

## GET `/users/logout`

Logs out the authenticated user by blacklisting the JWT token and clearing the cookie.  
**Requires authentication (JWT token in cookie or Authorization header).**

### Request Headers

- `Cookie: token=<jwt_token>`  
  or  
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**
  - Logout successful.
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - No token provided, invalid token, or blacklisted token.
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```
    or
    ```json
    {
      "message": "Invalid token."
    }
    ```
    or
    ```json
    {
      "message": "Token is blacklisted."
    }
  
---

# Captain Registration Endpoint

## POST `/captains/register`

Registers a new captain (driver) with vehicle details.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Minimum value 1.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"bike"`, or `"auto"`.

### Responses

- **201 Created**
  - Captain registered successfully.
  - Returns:
    ```json
    {
      "token": "<jwt_token>",
      "captain": {
        "_id": "...",
        "fullname": {
          "firstname": "...",
          "lastname": "..."
        },
        "email": "...",
        "vehicle": {
          "color": "...",
          "plate": "...",
          "capacity": ...,
          "vehicleType": "..."
        }
        // other captain fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or required fields missing.
  - Returns:
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **409 Conflict**
  - Email already exists.
  - Returns:
    ```json
    {
      "error": "Email already exists"
    }
    ```

### Example

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
