import axios from "axios"


export const loginThirdparty = async (user) => {
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/LoginThirdParty`,user);
    return response
}