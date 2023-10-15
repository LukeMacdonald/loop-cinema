import { request, gql } from "graphql-request";
const GRAPH_QL_URL = "http://localhost:4001/graphql";

async function getAllUsers(){
  const query = gql`
    {
      all_users {
        username
        email
        name
        blocked
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
}

async function updateUserBlocking(username, block) {
  const mutation = gql`
    mutation UpdateUserBlocking($input: UserInput) {
      manage_user(input: $input) {
        username
        email
        name
        blocked
      }
    }
  `;

  const variables = {
    input: {
      username: username,
      blocked: block,
    },
  };
  try {
    const response = await request(GRAPH_QL_URL, mutation, variables);
    return response.manage_user;
  } catch (error) {
    throw new Error("Error updating user blocking status: " + error.message);
  }
}

async function adminLogin(login) {
  try {

    const { username, password } = login;

    const query = gql`
      query($username: String, $password: String) {
        login(username: $username, password: $password) {
          username
          email
          name
        }
      }
    `;

    const variables = { username, password };
    const data = await request(GRAPH_QL_URL, query, variables);
    if (data.login === null){
      throw Error("Account Not Found!")
    }
    return data.login;
  } catch (error) {
    throw new Error(error);
  }
}

// Movie-related functions
async function getAllMovies() {
  const query = gql`
  {
    all_movies {
      movie_id
      title
      description
      director
      release_date
      poster
      duration
      genre
    }
  }
`;
const data = await request(GRAPH_QL_URL, query);
return data.all_movies;
}
async function getAllMoviesViews(){
  const query = gql`
  {
    all_movies {
      title
      views
    }
  }
`;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_movies;

}

async function findMovieByID(movie_id) {
  const query = gql`
    query ($movie_id: Int) {
      movie(movie_id: $movie_id) {
        movie_id
        title
        description
        director
        release_date
        poster
        duration
        genre
        reviews {
          review_id
          comment
          rating
          removed
          updatedAt
        }
      }
    }
  `;

  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie;
}

async function createMovie(movieData){
  const mutation = gql`
  mutation CreateMovie($input: MovieInput) {
    create_movie(input: $input) {
      movie_id
      title
      description
      director
      release_date
      poster
      duration
      genre
    }
  }
`;
  movieData["duration"] = parseInt(movieData["duration"],10)
  const variables = { input: movieData };
  const data = await request(GRAPH_QL_URL, mutation, variables);
  return data.create_movie;
}

async function updateMovie(id, movieData) {
  const { reviews, ...updatedMovieData } = movieData;
  const mutation = gql`
    mutation UpdateMovie($input: MovieInput) {
      update_movie(input: $input) {
        movie_id
        title
        description
        director
        release_date
        poster
        duration
        genre
      }
    }
  `;
  const variables = {input: updatedMovieData };
  const data = await request(GRAPH_QL_URL, mutation, variables);
  return data.update_movie;
}

// Session-related functions
async function getMovieSessions(movie_id) {
  const query = gql`
    query ($movie_id: Int) {
      movie(movie_id: $movie_id) {
        movie_id
        sessions {
          session_id
          session_time
          available_seats
        }
      }
    }
  `;

  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie.sessions;
}

async function getMovieReviews(movie_id) {
  const query = gql`
    query ($movie_id: Int) {
      movie(movie_id: $movie_id) {
        movie_id
        reviews {
          review_id
          removed 
        }
      }
    }
  `;

  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie.reviews;
}

async function getMovieReviewsWithRating(movie_id) {
  const query = gql`
    query ($movie_id: Int) {
      movie(movie_id: $movie_id) {
        movie_id
        reviews { 
          rating
          removed
        }
      }
    }
  `;

  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie.reviews;
}

async function createSession(sessionData){
  const mutation = gql`
  mutation CreateSession($input: SessionInput) {
    create_session(input: $input) {
      movie_id
      session_time
      available_seats
    }
  }
`;
 
  const variables = { input: sessionData };
  const data = await request(GRAPH_QL_URL, mutation, variables);
  return data.create_session;

}


async function deleteReview(review_id) {
  const mutation = gql`
    mutation DeleteReview($review_id: Int) {
      remove_review(input: { review_id: $review_id }) {
        review_id
        comment
        rating
        removed
        updatedAt
      }
    }
  `;

  const variables = { review_id };
  const data = await request(GRAPH_QL_URL, mutation, variables);
  return data.remove_review;
}

async function getGroupedReservations(){
  const query = gql`
  {
    reservations_by_date {
      createdAt
      totalReservations
    }
  }
`;
  const data = await request(GRAPH_QL_URL, query);
  return data.reservations_by_date;

}
async function getMoviesWithTotalReviews() {
  const query = gql`
    {
      all_movies {
        title
        movie_id
      }
    }
  `;

  const moviesData = await request(GRAPH_QL_URL, query);
  const result = [];

  // Using for...of loop for sequential async operations
  for (const movie of moviesData.all_movies) {
    const reviews = await getMovieReviews(movie.movie_id);
    const filteredReviews = reviews.filter(review => !review.removed);
    const count = filteredReviews.length;
    if (count > 0){
      result.push({ "title": movie.title, "count": count });

    }
    
  }
  return result;
}

async function getMoviesWithAverageReviews() {
  const query = gql`
    {
      all_movies {
        title
        movie_id
      }
    }
  `;

  const moviesData = await request(GRAPH_QL_URL, query);
  const result = [];
  let totalCount = 0;

  // Using for...of loop for sequential async operations
  for (const movie of moviesData.all_movies) {
    const reviews = await getMovieReviews(movie.movie_id);
    const filteredReviews = reviews.filter(review => !review.removed);
    totalCount += filteredReviews.length;
    const count = filteredReviews.length;
    if (count > 0){
      result.push({ "title": movie.title, "count": count });
    }
    
  }

  // Calculate average reviews count for each movie
  for (const movie of result) {
    movie.average = movie.count / totalCount;
  }

  return result;
}

async function getMoviesWithRating() {
  const query = gql`
    {
      all_movies {
        title
        movie_id
      }
    }
  `;

  const moviesData = await request(GRAPH_QL_URL, query);
  const result = [];
 
  for (const movie of moviesData.all_movies) {
    const reviews = await getMovieReviewsWithRating(movie.movie_id);
    const filteredReviews = reviews.filter(review => !review.removed);
    let totalRating = 0;
    for (const review of filteredReviews) { 
        totalRating += review.rating;
    }
    if (filteredReviews.length > 0){
      const averageRating = filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;
      result.push({ "title": movie.title, "rating": averageRating });
    }
    
}

  return result;
}

export {
  getAllUsers,
  adminLogin,
  updateUserBlocking,
  getAllMoviesViews,
  getAllMovies,
  getMovieSessions,
  createSession,
  updateMovie,
  createMovie,
  findMovieByID,
  deleteReview,
  getGroupedReservations,
  getMoviesWithRating,
  getMoviesWithTotalReviews,
  getMoviesWithAverageReviews
};
