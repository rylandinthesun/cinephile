# Cinephile

### Summary

A simple web app to help keep track of movies you've watched or want to watch. As a user, you're able to rate and review movies you have watched.

### Tech & API

I will be using Next.js and Firebase for this project. The API will be using is the [OMDB](https://www.omdbapi.com/) API.

### Schema

A table for users containing username, email, password, name, movie rating, movie review, movie watched, movie want to watch, comments and likes.  
Also another table for movies connecting the users containing movie id/data, ratings, reviews, watched, want to watch, comments and likes.  

### User Flow

* Entering the page the user can chose to sign up or login to the page through a secure sign up.
* Once logged in a user will be able to view/edit their user info.
* A user can search for movies where they can mark each specific movie as "watched" or "want to watch" which watched and rated movies will be added to their specific user page.
* A user is also able to rate and review a specific movie is they have "watched" it.

### Stretch Goals

* Possibly making a mobile version of the app.
* Add social features so users can interact and view other users data.
