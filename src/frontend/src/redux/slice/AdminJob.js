import { createSlice } from "@reduxjs/toolkit";
import { AdminJobThunk } from "../action/getAdminJob";

const initialState = {
    loading: false,
    adminJob: null,
    error: null,
}

const AdminJobSlice= createSlice({
    name: "jobAdmin",
    initialState,
    reducers: {

    },

    extraReducers: {
      [AdminJobThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [AdminJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading: false,
            error:payload
        }
      },
      [AdminJobThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            adminJob: payload
        }
      }  
    }
})

export default AdminJobSlice.reducer