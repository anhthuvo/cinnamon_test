import axios from "axios";

export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_ADMIN_URL,
   headers: {
     "Content-Type": "application/json",
   },
 });


export const getUsersApi = (pageSize = 30, since = 0) => {
   return api.get(`https://api.github.com/users?per_page=${pageSize}&since=${since}`)
}

export const getUserByNameApi = (username: string = "") => {
   return api.get(`https://api.github.com/users/${username}`)
}
  

