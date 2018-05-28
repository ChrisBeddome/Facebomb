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

**GET**: Get all information about single user

parameters: 
* none

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user information

### /users/:userID/info

**GET**: Get profile information about single user

parameters: 
* none

returns:
* success: boolean set to true
* message: string containing server response message
* data: object containing user profile information

example response: 

```
{
    "success": true,
    "message": "search successful",
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

**PATCH**: Update profile information of user. 

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

### /users/:userID/influences

**GET**: Get musical influences for single user

parameters: 
* none

returns:
* success: boolean set to true
* message: string containing server response message
* data: array containing artist detail objects

example response: 

```
{
    "success": true,
    "message": "search successful",
    "data": [
        {
            "id": 49249276,
            "artistID": "1aEYCT7t18aM3VvM6y8oVR",
            "artistName": "Alkaline Trio"
        },
        {
            "id": 2354937,
            "artistID": "6hAUCkzZpoYGObd8qFW5TT",
            "artistName": "Pokey LaFarge"
        }
    ]
}
```

**POST** add musical influence to user

parameters: 
* artistIDs - array of strings - required: array containing spotify IDs of artists

returns:
* success: boolean set to true
* message: string containing server response message
* data: array containing artist detail objects

example response: 

```
{
    "success": true,
    "message": "influence added",
     "data": [
        {
            "id": 49249276,
            "artistID": "1aEYCT7t18aM3VvM6y8oVR",
            "artistName": "Alkaline Trio"
        },
        {
            "id": 2354937,
            "artistID": "6hAUCkzZpoYGObd8qFW5TT",
            "artistName": "Pokey LaFarge"
        }
    ]
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

example response: 

```
{
    "success": true,
    "message": "search successful",
    "data": [
        {
            "id": "3WrFJ7ztbogyGnTHbHJFl2",
            "name": "The Beatles"
        },
        {
            "id": "2NUpOkMGBeKWAPI0Ckn6gx",
            "name": "Lopez Beatles"
        },
        {
            "id": "1UarLtyjvxGiRTsfFXxtnA",
            "name": "The Tape-beatles"
        },
        {
            "id": "1hsiU6wK0AYDtUEWkQHHx3",
            "name": "Beatles Para Crianças"
        },
        {
            "id": "3cBV24PM5nZsXqopSHvdtS",
            "name": "The Beatles Recovered Band"
        }
    ]
}
```

## Errors

All error responses will contain: 

* success: boolean set to false
* error: string containing error message


