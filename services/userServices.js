import axios from "axios";

const fetcheAllUser = () => {

    return axios.get("http://localhost:3001/Database")
}


const postUser = () => {
    const name = 'John Doe';
    const age = '30';
    return axios.post("http://localhost:3001/test", { name, age })
}
export { fetcheAllUser, postUser }