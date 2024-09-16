
import axios from 'axios'


const Config = axios.create({
    baseURL:"http://localhost:5000"
});

export default Config