import React, { useEffect, useState } from "react";
import { getAllMovies, incrementMovieViews } from "../data/repository";
import EventInfoCard from "../components/landing/EventInfoCard";
import BusinessInfoCard from "../components/landing/BusinessInfoCard";
import CommunityEvent from "../components/landing/CommunityEvent";
import MusicFestialImg from "../assets/images/MusicFestival.jpeg";
import GardendingImg from "../assets/images/Gardening.jpg";
import ArtInParkImg from "../assets/images/ArtInPark.jpeg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [feature, setFeature] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const cinemaMovies = await getAllMovies();
      console.log(cinemaMovies);
      console.log(cinemaMovies[0]);
      setFeature(cinemaMovies[0]);
      setMovies(cinemaMovies);
    }

    fetchMovies();
  }, []);

  const handleClick = async (movie_id) => {
    await incrementMovieViews(movie_id);
    navigate(`/movie/details/${encodeURIComponent(movie_id)}`);
  };

  return (
    <div className="w-full">
      <div className="w-full h-[75vh]">
        <img
          src="https://people.com/thmb/xOOUacGvqnLOTsY00MxgPxiD8Pc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/barbie-film-040623-1-bfbbf50d182642318a6285aef36e1552.jpg"
          className="h-full w-full"
          alt={feature.title}
        />
        <div className="absolute w-1/3 -mt-[20rem] ml-32 flex flex-col items-start justify-between gap-y-5 p-8">
          <h2 className="text-3xl">{feature.title}</h2>
          <p>{feature.description}</p>
          <motion.button
            className="bg-red-700 p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(feature.movie_id)}
          >
            BOOK A TICKET
          </motion.button>
        </div>
      </div>
      <h4 className="m-4 mt-8 mb-1 text-3xl font-bold">Now Showing</h4>
      <div className="flex items-start justify-start overflow-auto mx-4 mt-3">
        {movies.map((movie, index) => (
          <div
            className="w-[15%] flex-shrink-0 text-lg p-2"
            key={movie.movie_id}
          >
            <button
              className="link-button"
              onClick={() => handleClick(movie.movie_id)}
            >
              <motion.img
                src={movie.poster}
                className="w-[95%] h-[20rem] max-h-[20rem] rounded-xl z-10"
                alt={movie.title}
                whileHover={{ y: -10 }}
              />
            </button>
            <p className="my-1 mx-2 text-base font-semibold">{movie.title}</p>
            <p className="my-1 mx-2 text-sm font-semibold text-gray-300">
              {movie.duration} mins
            </p>
          </div>
        ))}
      </div>
      <div className="w-full p-6 flex flex-col items-start justify-start">
        <h1 className="text-3xl font-bold mb-4">Community Events</h1>

        <div className="w-full flex items-start justify-start overflow-auto gap-4 mb-4">
          <CommunityEvent
            name="Summer Music Festival"
            date="July 22-24, 2023"
            img={MusicFestialImg}
            summary={
              "Get ready for three days of live music, delicious food, and fun activities at our Summer Music Festival. This family-friendly event brings the community together to celebrate the season."
            }
          />
          <CommunityEvent
            name="Community Gardening Workshop"
            date="May 8, 2023"
            img={GardendingImg}
            summary={
              "Learn about sustainable gardening practices, composting, and plant care in our Community Gardening Workshop. Green thumbs and beginners are all welcome to join and grow together."
            }
          />
          <CommunityEvent
            name="Art in the Park Exhibition"
            date="August 27, 2023"
            img={ArtInParkImg}
            summary=""
          />
        </div>
        <EventInfoCard />
      </div>
      {/* <div className="w-full p-6 flex items-start justify-between">
        <div className="w-[60%]">
          <EventInfoCard />
        </div>
        <div className="w-[35%]">
        <BusinessInfoCard />

        </div>

      </div> */}
    </div>
  );
};

export default Home;

