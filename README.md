# News Aggregator API 
This API is personalised news application which also manages user with authencation and authorisation and also stores the user's preferences along.

This application is running on port 3000

### Steps to run the application:
1. Run `npm install` command on the root of the application
2. Run `npm run start` command to start the application.

## Register an User
This endpoint register/signup an user.

**POST**: `/users/signup`

**Request**: 
```
{
    "name": "Clark Kent 2",
    "email": "clark@superman.com",
    "password": "Krypt()n8",
    "preferences": ["movies" , "comics"]
}
```

**Response**: 
```
{
    "message": "User registered successfully"
}
```

## Login an User
This endpoint login an user.

**POST**: `/users/login`

**Request**: 
```
{
    "email": "clark@superman.com",
    "password": "Krypt()n8"
}
```

**Response**: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xhcmsgS2VudCAyIiwiZW1haWwiOiJjbGFya0BzdXBlcm1hbi5jb20iLCJwcmVmZXJlbmNlcyI6WyJtb3ZpZXMiLCJjb21pY3MiXSwiaWQiOiI0MGFhNjk3OS03MDBlLTQyOTItODk2Ni1mYmM0MTgwYTRhZTMiLCJpYXQiOjE3NTMwNTE1MjF9.G0BnuLVZQDiOGHLYK5KFCXKbvJtMaFP4dfNVvkM-1E0"
}
```

## Get news preferences for an user
This endpoint fetches news preferences of an user.

**GET**: `/users/preferences`

**HEADER**: 
```
Authorization: Bearer <TOKEN>
```

**Response**: 
```
{
    "preferences": [
        "entertainment",
        "technology",
        "general"
    ]
}
```

## Update news preferences for an user
This endpoint update news preference of an user

**PUT**: `/users/preferences`

**HEADER**: 
```
Authorization: Bearer <TOKEN>
```

**Request**: 
```
{
    "preferences": ["entertainment" , "technology", "general"]
}
```

**Response**: 
```
{
    "message": "User preference updated successfully"
}
```

## Get news for the logged-in user
This endpoint fetches news from an external api.

**GET**: `/news`

**HEADER**: 
```
Authorization: Bearer <TOKEN>
```

**Response**: 
```
{
    "news": [
        {
            "source": {
                "id": null,
                "name": "New York Post"
            },
            "author": "Alexandra Bellusci",
            "title": "‘Yellowstone’ star Josh Lucas ties the knot with meteorologist Brianna Ruffalo inside the Vatican - New York Post",
            "description": "The couple tied the knot in an intimate European ceremony.",
            "url": "https://nypost.com/2025/07/19/entertainment/yellowstone-star-josh-lucas-marries-brianna-ruffalo-inside-the-vatican/",
            "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2025/07/108427971.jpg?quality=75&strip=all&w=1024",
            "publishedAt": "2025-07-19T20:30:00Z",
            "content": "The forecast predicts sunny skies for Josh Lucas and Brianna Ruffalo."
        }
    ]
}
```