import axios from 'axios';

const baseURL = 'http://localhost:5000/api';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGM1ZjY0ZGM2ZmQ5ZmVhZDY0OGY4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMwOTIwOSwiZXhwIjoxNjQ5Mzk1NjA5fQ.MEy6NbGqX-Lb-tPLme2k9hjYZ-lp_cehjpho2EuWEyY';

export const publicRequest = axios.create({
  baseURL,
});

export const userRequest = axios.create({
  baseURL,
  header: { token: `Bearer ${token}` },
});
