import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";


export const loginSpotify = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/users/login`
        );
        //const data = response.data;
        console.log(response);
        return 1;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data.");
    }
};
const login = async (data) => {
    try {
        console.log(data); console.log(data.email);
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: data.email,
        password: data.pass,
      });

      console.log('Login successful:', response.data);
      return (response.data);

    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
};

export const register = async (user) => {
  try {
    console.log(user);
      const response = await axios.post(`${API_BASE_URL}/users/register`,user);
      console.log(response);
      return response.data;
  } catch (error) {
      console.log(error);
      throw new Error(error.response.data);

  }
};

const fetchActiveSessions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/voting-session/active`);
    console.log(response.data);
    return response.data ;
  } catch (error) {
    console.error('Error fetching active sessions:', error.response.data.error);
  }
};

const fetchMusics = async (sessionId) => {

  try {
    const response = await axios.get(`${API_BASE_URL}/music/get-musics/${sessionId}`);
    console.log(response.data);
    return response.data ;
  } catch (error) {
    console.error('Error fetching active sessions:', error.response.data.error);
  }

};

const vote = async (userId, sessionId, musicId, rate) => {
  try {
    console.log(userId);
    console.log(musicId);

    const response = await axios.post(
      `${API_BASE_URL}/vote/vote/${sessionId}`,
      {
        user_id: userId,
        music_id: musicId,
        rating: rate,
      },
      {
        headers: {
          'Content-Type': 'application/json',         },
      }
    );

    console.log('response successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Response failed:', error.response.data.error);
    throw error; 
  }
};












const api = {loginSpotify, login, register, fetchActiveSessions, fetchMusics, vote };

export default api ;