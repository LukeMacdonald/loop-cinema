const { buildSchema } = require("graphql");
const db = require("../database");
const { GraphQLScalarType, Kind } = require("graphql");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

const graphql = {};

const DateType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    // Parse the incoming date string value
    return new Date(value);
  },
  serialize(value) {
    // Serialize the Date object to a string for output
    return value.toISOString();
  },
  parseLiteral(ast) {
    // Parse the date value from the AST (Abstract Syntax Tree)
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert AST string to Date object
    }
    return null; // Invalid AST type for a date
  },
});

graphql.schema = buildSchema(`
  scalar Date

  type User {
    username: String
    email: String
    password: String
    name: String
    blocked: Boolean
  }

  type Admin {
    username: String
    email: String
    password: String
    name: String
  }

  type Movie {
    movie_id: Int
    title: String
    description: String
    director: String
    release_date: Date  # Use Date scalar for release_date
    poster: String
    duration: Int
    genre: String
    views: Int
    reviews: [Review]
    sessions: [Session]
  }
  
  type Review {
    review_id: Int
    comment: String
    rating: Int
    updatedAt: Date
    createdAt: Date
    removed: Boolean
    movie_id: Int 

  }

  type Session {
    session_id: Int
    session_time: Date
    available_seats: Int
    movie_id: Int 
  }

  type Reservation {
    reservation_id: Int
    total_seats: Int
    createdAt: Date
  }
  type ReservationCount {
    createdAt: Date
    totalReservations: Int
  }
  type MovieReviewCount {
    title: String
    totalReviews: Int
  }

  input UserInput {
    username: String
    blocked: Boolean
  }

  input MovieInput {
    movie_id: Int
    title: String
    description: String
    director: String
    release_date: String
    poster: String
    duration: Int
    genre: String
  }
  input ReviewInput{
    review_id: Int
  }
  input SessionInput {
    movie_id: Int
    session_time: Date
    available_seats: Int
  }

  type Query {
    all_users: [User],
    all_movies: [Movie],
    movie(movie_id:Int):Movie
    login(username: String, password: String): User
    reservations_by_date: [ReservationCount]
    movies_review_counts: [MovieReviewCount]
  }

  type Mutation {
    create_movie(input: MovieInput): Movie,
    update_movie(input: MovieInput): Movie,
    manage_user(input: UserInput): User,
    remove_review(input: ReviewInput): Review
    create_session(input: SessionInput): Session
    
  }

`);

graphql.root = {
  // Queries
  all_users: async () => {
    try {
      const users = await db.user.findAll();
      return users;
    } catch (err) {
      throw new Error("An error occurred while fetching all users.");
    }
  },
  all_movies: async () => {
    try {
      const movie = await db.movie.findAll();
      return movie;
    } catch (err) {
      throw new Error("An error occurred while fetching all movies.");
    }
  },
  movie: async (args) => {
    const movie_id = args.movie_id;
    console.log("Hello");
    try {
      const movie = await db.movie.findByPk(movie_id);
      movie["sessions"] = await db.session.findAll({ where: { movie_id } });
      movie["reviews"] = await db.review.findAll({ where: { movie_id } });
      return movie;
    } catch (err) {
      throw new Error("An error occurred while fetching all movie.");
    }
  },
  reservations_by_date: async () => {
    try {
      const reservations = await db.reservation.findAll({
        include: [
          {
            model: db.session,
            attributes: ["session_time"],
          },
        ],
        attributes: [
          [
            Sequelize.fn("date", Sequelize.col("session.session_time")),
            "sessionTime",
          ], // Extract date part from session_time column
          [
            Sequelize.fn("sum", Sequelize.col("total_seats")),
            "totalReservations",
          ], // Sum total_seats for each session_time
        ],
        group: [
          Sequelize.fn("date", Sequelize.col("session.session_time")), // Group by the extracted session_time
          "session.session_id", // Include session_id in the group by clause
        ],
      });

      // Map the output to match the ReservationCount type
      const formattedReservations = reservations.map((reservation) => ({
        createdAt: reservation.dataValues.sessionTime, // assuming sessionTime is in the correct format
        totalReservations: reservation.dataValues.totalReservations,
      }));

      return formattedReservations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  movies_review_counts: async () => {
    try {
      const moviesWithReviewCounts = await db.movie.findAll({
        attributes: ["title"],
        include: [
          {
            model: db.review,
            attributes: [
              [
                Sequelize.fn("COUNT", Sequelize.col("review_id")),
                "totalReviews",
              ],
            ],
          },
        ],
      });
      console.log(moviesWithReviewCounts);

      // Map the output to match the MovieReviewCount type
      const formattedMovies = moviesWithReviewCounts.map((movie) => ({
        title: movie.dataValues.title,
        totalReviews: movie.dataValues.reviews[0].dataValues.totalReviews,
      }));

      return formattedMovies;
    } catch (err) {
      throw new Error(
        "An error occurred while fetching movies with review counts.",
      );
    }
  },
  login: async (args) => {
    console.log(args.username);
    const username = args.username;
    const password = args.password;
    try {
      const user = await db.admin.findByPk(username);
      return user;
    } catch (err) {
      throw new Error("An error occurred while logging in.");
    }
  },
  // Mutations
  create_movie: async (args) => {
    const { input } = args;
    try {
      const movie = await db.movie.create(input);
      return movie;
    } catch (err) {
      throw new Error("An error occurred while creating the movie.");
    }
  },
  update_movie: async (args) => {
    const { input } = args;
    const { movie_id, ...updates } = input;
    try {
      const movie = await db.movie.findByPk(movie_id);
      if (!movie) {
        throw new Error("Movie not found.");
      }

      // Update movie attributes
      Object.assign(movie, updates);
      await movie.save();
      return movie;
    } catch (err) {
      throw new Error("An error occurred while updating the movie.");
    }
  },
  manage_user: async (args) => {
    const { input } = args;

    try {
      const user = await db.user.findByPk(input.username);
      if (!user) {
        throw new Error("User not found");
      }
      user.blocked = input.blocked;
      await user.save();
      return user;
    } catch (err) {
      throw new Error("An error occurred while updating the user.");
    }
  },
  remove_review: async (args) => {
    const { review_id } = args.input;
    try {
      const review = await db.review.findByPk(review_id);
      if (!review) {
        throw new Error("Review not found");
      }
      review.removed = true;
      review.comment =
        "<strong>[This review has been deleted by the admin]</strong>";
      await review.save();
      return review;
    } catch (err) {
      throw new Error("An error occurred while updating the review.");
    }
  },
  create_session: async (args) => {
    const { input } = args;
    try {
      const session = await db.session.create(input);
      return session;
    } catch (err) {
      throw new Error("An error occurred while creating the session.");
    }
  },
};
module.exports = graphql;

