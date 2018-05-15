# Jam Mates

## Setup

Install dependencies:
```
$npm init
```

Set port to be used by express in API/config/config.js.

Set port to be used by mysql in API/config/config.js.

Import database from API/config/db_init.sql.

To start server, navigate to API directory and run:

```
$npm start
```

## End Points

**/register**: 

POST: Register a new user.

parameters: 
* email - string - required
* username - string - required
* password - string - required

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user id, username, and email

**/login**: 

POST: Log in to a registered account.

parameters: 
* email - string - required
* password - string - required

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user id, username, email, and access token

Access token must be provided with all subsequent requests in the **authorization** HTTP header:

```
Authorization: Bearer <access-token>
```

**/artists**: 

GET: Search for an artist via spotify.

parameters must be URL encoded.

parameters: 
* term - string - required

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing array of artist information

## Errors

All error responses will contain: 

* success: boolean set to false
* error: string containing error message


