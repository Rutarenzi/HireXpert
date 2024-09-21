import { createSlice } from "@reduxjs/toolkit";
import { UpdateApplicantsThunk } from "../action/updateApplication";

const initialState = {
    loads: false,
    UpdateApplicants: null,
    error: null,
}

const UpdateApplicantSlice= createSlice({
    name: "UpdateApplicants",
    initialState,
    reducers: {

    },

    extraReducers: {
      [UpdateApplicantsThunk.pending] : (state) =>{
        return{
            ...state,
            loads: true
        }
      },
      [UpdateApplicantsThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            error:payload
        }
      },
      [UpdateApplicantsThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            loads: false,
            UpdateApplicants: payload
        }
      }  
    }
})

export default UpdateApplicantSlice.reducer