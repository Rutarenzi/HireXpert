import { createSlice } from "@reduxjs/toolkit";
import { OneJobThunk } from "../action/getOneJob";

const initialState = {
    load: false,
    OneJob: null,
    error: null,
}

const OneJobSlice= createSlice({
    name: "OneJob",
    initialState,
    reducers: {

    },

    extraReducers: {
      [OneJobThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [OneJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [OneJobThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            load: false,
            OneJob: payload
        }
      }  
    }
})

export default OneJobSlice.reducer