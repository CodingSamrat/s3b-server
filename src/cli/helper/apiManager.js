import axios from 'axios';
import { API_BASE, PORT } from '../../../s3b.config.js';
import { _getAccessToken } from './authentication.js';

export const BASE_API = `http://localhost:${PORT}${API_BASE}`
const token = await _getAccessToken()

const ApiManager = axios.create({
    baseURL: BASE_API,
    headers: {
        Authorization: `Bearer ${token}`
    }
});




export default ApiManager