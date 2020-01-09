import axios from 'axios';

base_url = 'http://localhost:5000/plot';

const promise = axios.get(base_url);
console.log(promise);
