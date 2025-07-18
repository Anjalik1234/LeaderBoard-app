import axios from 'axios';

const API_URL = 'https://leaderboard-app-oozm.onrender.com/api/users';

export const getAllUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const claimPoints = async (userId) => {
  const res = await axios.post(`${API_URL}/claim/${userId}`);
  return res.data;
};

export const addUser = async (name) => {
  const res = await axios.post(`${API_URL}`, { name });
  return res.data;
};

export const getRankings = async () => {
  const res = await axios.get(`${API_URL}/rankings`);
  return res.data;
};
