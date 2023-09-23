import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// --- User ---------------------------------------------------------------------------------------
async function createProfile(user){
    const response = await axios.post(API_HOST + '/user', user);
    return response.data;
}

async function findUserByEmail(email){
    const response = await axios.get(API_HOST + `/user/${email}`)
    return response.data;
}

async function getUser(username){
    const response = await axios.get(API_HOST + `/user/profile/${username}`)
    return response.data;
}

async function removeUser(userID){
    const response = await axios.delete(API_HOST + `/user/${userID}`)
    return response.data
}

async function login(login){
    const response = await axios.post(API_HOST + '/user/login', login);
    return response.data
}

async function updateUser(user){
    console.log(user);
    const response = await axios.put(API_HOST + '/user', user);
    return response.data;
}

// --- Movies ---------------------------------------------------------------------------------------
async function allMovies(){
    const response = await axios.get(API_HOST + '/movies');
    return response.data;
}

async function movieSessions(movieID){
    const response = await axios.get(API_HOST + `/movies/session/${movieID}`);
    return response.data; 
}

async function movieReviews(movieID){
    const response = await axios.get(API_HOST + `/movies/review/${movieID}`);
    return response.data; 
}

async function findMovieByID(movieID){
    console.log(movieID)
    const response = await axios.get(API_HOST + `/movies/${movieID}`);
    console.log(response)
    return response.data;

}



export {
    createProfile, 
    findUserByEmail,
    removeUser,
    updateUser,
    getUser,
    login,
    allMovies,
    movieSessions,
    findMovieByID,
    movieReviews
}