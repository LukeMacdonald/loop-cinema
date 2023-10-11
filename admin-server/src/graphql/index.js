const { buildSchema } = require("graphql");
const db = require('../database');

const graphql = { };
graphql.schema = buildSchema(`
  type User{
    username: String,
    email: String,
    password: String,
    name: String,
    blocked: Boolean
  }

  type Admin{
    username: String,
    email: String,
    password: String,
    name: String
  }

  type Movie {
    movie_id: Int,
    title: String,
    description: String,
    director: String,
    release_date: String,
    poster: String,
    duration: Int,
    genre: String,
    reviews: [Review],
    sessions: [Session]
  }
  
  type Review {
    review_id: Int,
    comment: String,
    rating: Int,
    removed: Boolean
  }

  type Session {
    session_id: Int,
    session_time: String,
    available_seats: Int
  }

  type Reservation {
    reservation_id: Int,
    total_seats: Int
  }

  input UserInput{
    username: String,
    blocked: Boolean
  }

  input MovieInput{
    title: String,
    description: String,
    director: String,
    release_date: String,
    poster: String,
    duration: Int,
    genre: String,
  }
  input ReviewInput{
    review_id: Int
  }

  type Query {
    all_users: [User],
    all_movies: [Movie],
    movie_by_id(movie_id:Int):Movie
    movie_reviews(movie_id: Int): [Review],
    movie_sessions(movie_id: Int): [Session],
    user_reservations(user_id: Int): [Reservation]
    login(email: String, password: String): User
  }

  type Mutation {
    create_movie(input: MovieInput): Movie,
    update_movie(input: MovieInput): Movie,
    manage_user(input: UserInput): User,
    remove_review(input: ReviewInput): Review
  }

`)

graphql.root = {
    // Queries
    all_users: async() => {
        try {
            const users = await db.user.findAll();
            return users;
        } catch (err) {
            throw new Error('An error occurred while fetching all users.');
        }
    },
    all_movies: async() => {
      
        try {
            const movie = await db.movie.findAll();
            return movie;
        } catch (err) {
            throw new Error('An error occurred while fetching all movies.');
        }
    },
    movie_by_id: async(args) => {
        const movie_id = args.movie_id;
        console.log("Hello")
        try {
            const movie = await db.movie.findByPk(movie_id);
            movie["sessions"] = await db.session.findAll({where: {movie_id}})
            movie["reviews"] = await db.review.findAll({where: {movie_id}})
            return movie;
        }catch (err) {
            throw new Error('An error occurred while fetching all movie.');
        }
    },
    movie_reviews: async(args) => {
        const movie_id = args.movie_id;
        try {
            const reviews = await db.review.findAll({ where: { movie_id } });
            return reviews;
        } catch (err) {
            throw new Error('An error occurred while fetching movie reviews.');
        }
    },
    movie_sessions: async (parent, args) => {
        const movie_id = args.movie_id;
        try {
          const sessions = await db.session.findAll({ where: { movie_id } });
          return sessions;
        } catch (err) {
          throw new Error('An error occurred while fetching movie sessions.');
        }
      },
    user_reservations: async (parent, args) => {
        const user_id = args.user_id;
        try {
          const reservations = await db.reservation.findOne({ where: { user_id } });
          return reservations;
        } catch (err) {
          throw new Error('An error occurred while fetching user reservations.');
        }
      },
    login: async (parent, args) => {
        const email = args.email;
        const password = args.password;
        try {
          const user = await db.admin.findOne({ where: { email } });
          return user;
        } catch (err) {
          throw new Error('An error occurred while logging in.');
        }
      },
    // Mutations
    create_movie: async (args) => {
      const { input } = args;
      try {
        const movie = await db.movie.create(input);
        return movie;
      } catch (err) {
        throw new Error('An error occurred while creating the movie.');
      }

    },
    update_movie: async (args) => {
      const { input } = args;
      const { movie_id, ...updates } = input;
      try {
        const movie = await db.movie.findByPk(movie_id);
        if (!movie) {
          throw new Error('Movie not found.');
        }

        // Update movie attributes
        Object.assign(movie, updates);

        await movie.save();
        return movie;
      } catch (err) {
        throw new Error('An error occurred while updating the movie.');
      }
    },
    manage_user: async (parent, args) => {
        const { username, blocked } = args.input;
        try {
          const user = await db.user.findByPk(username);
          if (!user) {
            throw new Error('User not found');
          }
          user.blocked = blocked;
          await user.save();
          return user;
        } catch (err) {
          throw new Error('An error occurred while updating the user.');
        }
      },
      remove_review: async (parent, args) => {
        const { review_id } = args.input;
        try {
          const review = await db.review.findByPk(review_id);
          if (!review) {
            throw new Error('Review not found');
          }
          review.removed = true;
          await review.save();
          return review;
        } catch (err) {
          throw new Error('An error occurred while updating the review.');
        }
    }

}
module.exports = graphql;