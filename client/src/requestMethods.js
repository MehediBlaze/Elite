import axios from 'axios';

const baseURL = 'https://elite-shop-backend.herokuapp.com/api';
const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL,
});

export const userRequest = axios.create({
  baseURL,
  header: { token: `Bearer ${token}` },
});
