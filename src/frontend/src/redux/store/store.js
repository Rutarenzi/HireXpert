import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "../slice/applicationSlice";
import CreateJobSlice from "../slice/jobSlice";
import UpdateJobSlice from "../slice/updateJob";
import DeleteJobSlice from "../slice/deleteJobSlice";
import AdminJobSlice from "../slice/AdminJob";
import AllJobSlice from "../slice/AllJobSlice";

const store = configureStore({
    reducer: {
        application: applicationSlice,
        createJob: CreateJobSlice,
        updateJob: UpdateJobSlice,
        deleteJob: DeleteJobSlice,
        jobAdmin: AdminJobSlice,
        AllJob: AllJobSlice
    }
});

export default store;