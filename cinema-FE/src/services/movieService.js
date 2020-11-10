import axios from "axios"

export const createMovie = movie => {
    axios.post("http://localhost:8080/movie", movie)
    .then(res => {
        return res
    })
}

export const editMovie = async movie => {
    const res = (await axios.put("http://localhost:8080/movie", movie)).data
    return res;
}

export const getMovies = () => {
    axios.get("http://localhost:8080/movie")
    .then(res => {
        return res.data;
    })
}