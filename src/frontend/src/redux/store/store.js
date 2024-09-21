import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "../slice/applicationSlice";
import CreateJobSlice from "../slice/jobSlice";
import UpdateJobSlice from "../slice/updateJob";
import DeleteJobSlice from "../slice/deleteJobSlice";
import AdminJobSlice from "../slice/AdminJob";
import AllJobSlice from "../slice/AllJobSlice";
import getOneJobSlice from "../slice/getOneJobSlice";
import JobApplicantSlice from "../slice/jobApplicants"
import UpdateApplicantSlice from "../slice/updateApplicant"

const store = configureStore({
    reducer: {
        application: applicationSlice,
        createJob: CreateJobSlice,
        updateJob: UpdateJobSlice,
        deleteJob: DeleteJobSlice,
        jobAdmin: AdminJobSlice,
        AllJob: AllJobSlice,
        OneJob: getOneJobSlice,
        jobApplicants: JobApplicantSlice,
        updateApplicant: UpdateApplicantSlice
    }
});

export default store;