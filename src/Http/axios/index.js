import axios from 'axios'

const API_URL      = import.meta.env.VITE_API_URL
const ACCESS_TOKEN = localStorage.getItem('accessToken') ?? null

export default axios.create({
    baseURL: API_URL,
    headers: {
        common: {
            'Authorization': ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : null,
        }
    }
});