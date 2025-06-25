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