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

### /register

**POST**: Register a new user.

parameters: 
* email - string - required
* username - string - required
* password - string - required

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user id, username, and email

### /login

**POST**: Log in to a registered account.

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

### /users/:userID

**GET**: Get information about single user

parameters: 
* none

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user information

**PATCH**: Update information of logged in user. 

parameters (must contain at least one): 
* city - string: full name of city
* province - string: full name of province / state / territory
* country - string: 2 character IS02 country code
* bio - string: "user bio"
* jamSpace - boolean: indicating whether or not user has a practice space

example request headers:

```
Authorization: Bearer eyJhb...1I9652D4
```

example request body: 

```
{
	"city" : "Toronto",
	"province" : "Ontario", 
	"country" : "CA",
	"bio" : "Jazz bass player looking for small group to play with",
	"jamSpace" : true
}
```

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user information

example response: 

```
{
    "success": true,
    "message": "user updated",
    "data": {
        "id": 59363698,
        "username": "test_user",
        "city": "Toronto",
        "province": "Ontario",
        "country": "CA",
        "bio": "Jazz bass player looking for small group to play with",
        "jamSpace": true,
        "imageURL": null
    }
}
```

### /artists

**GET**: Search for an artist via spotify.

parameters must be URL encoded.

parameters: 
* term - string - required

returns:
* success: boolean set to true
* message: string containing server response message
* data: array containing artist information

## Errors

All error responses will contain: 

* success: boolean set to false
* error: string containing error message


