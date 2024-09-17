import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
   
});

const errorHandler = (error) =>{
    const err =error.response.data;
    if(error.response.status == 401 ){
      window.location.href="/"
     }
    toast.error("Failed! "+ err.error);
    return Promise.reject({ ...error})
 }
  
 const successHandler = (response) => {
    toast.success(response.data.message);
    return response
 }
 instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
 )

export default instance;