import axios from "axios"

// const axios = axiosLIB.create()

// axios.interceptors.request.use((req) => {
//   if (localStorage.getItem('user')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
//   }

//   return req;
// });

// export const setAuthToken = (token) => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

export const getConfessionAPI = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/confession`)
    return response
}

export const addConfessionAPI = async (confession) => {
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/confession`,confession)
    return response
}

export const getConfessionDetailAPI = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/confession/${id}`)
    return response
}

export const getConfessionSortedAPI = async (by) => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/confession?sort=${by}`)
    return response
}

export const updateConfessionLikeAPI = async (id,userID) => {
    const response = await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/confession/${id}`,{userID: userID} )
    return response
}
