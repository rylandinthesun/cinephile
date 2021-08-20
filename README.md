# Cinephile
[https://cinephile-wheat.vercel.app/](https://cinephile-wheat.vercel.app/)

### Summary

A simple web app to help keep track of movies you've watched or want to watch. As a user, you're able to rate and review movies you have watched.

### Tech & API

I will be using Next.js and Firebase for this project. The API will be using is the [OMDB](https://www.omdbapi.com/) API.

### Tests

Tests are located in the file labeled 'tests' and are ran by using the command `npm jest`.

### Schema

A table for users containing name, email, id, movie rating, movie review, movie watched & movie want to watch. 

### User Flow

* Entering the page the user can chose to sign up or login to the page through a secure sign up.
* A user can search for movies where they can mark each specific movie as "watched" or "want to watch" which watched and rated movies will be added to their specific user page.
* A user is also able to rate and review a specific movie is they have "watched" it.
* If the user decides they don't want to have an account then they are able to delete said account and all info that is associated with it.

### Stretch Goals

* Possibly making a mobile version of the app.
* Add social features so users can interact and view other users data.

### Final Thoughts

As I did really like the OMDB API and appreciated all of the movie data that I was able to access, I do wish there was a field for when movie info was added/created to the API. That way I could easily display a homepage of recommended new movies that a user could access without having to search for every movie.
