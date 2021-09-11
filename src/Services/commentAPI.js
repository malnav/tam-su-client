import axios from "axios"

export const getConfessionCommentAPI = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/comment/?confession=${id}`)
    return response
}

export const addCommentAPI = async (comment) =>{
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/comment`,comment)
    return response
}