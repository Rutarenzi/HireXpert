export const createJob=async(JobPost)=>{ 
  return  await window.canister.HireApi.createJob(JobPost)
}

export const updateJob=async(JobPost,jobId)=>{
  return await window.canister.HireApi.updateJob(JobPost,jobId)
}

export const deleteJob=async(jobId)=>{
console.log(jobId)
  return await window.canister.HireApi.deleteJob(jobId)
}

export const getMyJobs=async()=>{
  return await window.canister.HireApi.getMyJobs()
}

export const getAllJobs=async()=>{
  return await window.canister.HireApi.getAllJobs()
}

export const getJobByCategory=async(category)=>{
  return await window.canister.HireApi.getJobByCategory(category)
}

export const getOneJob=async(id)=>{
  return await window.canister.HireApi.getOneJob(id)
}

export const applyToJob=async(application,jobId)=>{
  return await window.canister.HireApi.applyToJob(application,jobId)
}

export const getJobApplicants=async(jobId)=>{
  return await window.canister.HireApi.getJobApplicants(jobId)
}

export const updateApplication=async(status,AppId)=>{
  return await window.canister.HireApi.updateApplication(status,AppId)
}

export const getApplicantsByStatus=async(jobId,status)=>{
  return await window.canister.HireApi.getApplicantsByStatus(jobId,status)
}



