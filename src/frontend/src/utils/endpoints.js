




export const createJob=async(JobPost)=>{
    return await window.canister.HireApi.createJob(JobPost)
  }

export const updateJob=async(JobPost,jobId)=>{
    return await window.canister.HireApi.updateJob(JobPost,jobId)
  }

export const deleteJob=async(jobId)=>{
    return await window.canister.HireApi.deleteJob(jobId)
  }

export const getMyJobs=async()=>{
    return await window.canister.HireApi.getMyJobs(jobId)
  }

export const getAllJobs=async()=>{
    return await window.canister.HireApi.getAllJobs()
  }

export const getJobByCategory=async(category)=>{
    return await window.canister.HireApi.getJobByCategory(category)
  }
  
export const getOneJob=async(category)=>{
    return await window.canister.HireApi.getOneJob(category)
  }

export const applyToJob=async(application,jobdId)=>{
    return await window.canister.HireApi.applyToJob(application,jobdId)
  }

export const getJobApplicants=async(jobdId)=>{
    return await window.canister.HireApi.getJobApplicants(jobdId)
  }

export const updateApplication=async(status,AppId)=>{
    return await window.canister.HireApi.updateApplication(jobdId)
  }
  
export const getApplicantsByStatus=async(jobId,status)=>{
    return await window.canister.HireApi.getApplicantsByStatus(jobId,status)
  }
  


