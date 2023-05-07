import axios from 'axios'

const API_URL      = "https://skr-inventory.mishajib.me/api/v1"
const ACCESS_TOKEN = localStorage.getItem('accessToken') ?? null

export default axios.create({
    baseURL: API_URL,
    headers: {
        common: {
            'Authorization': ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : null,
        }
    }
});