import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  blob,
  bool,
  Canister,
  init,
  Void,
  nat,
  // Duration
} from "azle/experimental";
import { v4 as uuidv4 } from "uuid";


const requireProps = Record({
  skill: Vec(text),
  educationLevel:text,
  experience: text
})
const salaryRangeProps =Record({
min: text,
max: text  
})
const JobPost = Record({
  jobId: text,
  recruiterId: Principal,
  company:text,
  jobTitle: text,
  jobDescription: text,
  requirements:requireProps,
  salaryRange: salaryRangeProps,
  employmentType: text,
  createdAt: text,
  updatedAt: text,
  status:text,
  applicants: Vec(text),
  industry: text
});
type  JobPost = typeof JobPost.tsType



const JobPostPayload = Record({
  company:text,
  jobTitle: text,
  jobDescription: text,
  requirements:requireProps,
  salaryRange: salaryRangeProps,
  employmentType: text,
  industry: text
});

type  JobPostPayload = typeof JobPostPayload.tsType



const Application = Record({
  applicationId: text,
  jobId: text,
  firstname: text,
  secondname: text,
  email:text,
  gender: text,
  country: text,
  education: text,
  skills: Vec(text),
  experience: nat64,
  coverletter: text,
  status: text,
  submittedAt: text,
  updatedAt: text
});
type Application = typeof Application.tsType
const ApplicationPayload = Record({
  firstname: text,
  secondname: text,
  email:text,
  gender: text,
  country: text,
  education: text,
  skills: Vec(text),
  experience: nat64,
  coverletter: text,
});
type ApplicationPayload = typeof ApplicationPayload.tsType

const Message = Variant({
  NotFound: text,
  Success: text,
  Error: text,
  NotAllowed:text
});

type Message = typeof Message.tsType

const JobStat= Record({
  totalJobs: nat,
  openJobs: nat,
  closedJobs: nat,
  totalIndustries: nat
})

const JobPostStorage = StableBTreeMap<text,JobPost>(0);
const ApplicationStorage  = StableBTreeMap<text,Application>(1)

export default Canister({

    //-----------JOB POSTING---------- 
   createJob: update([JobPostPayload],Result(Vec(JobPost),Message),async(payload)=>{
    try{
        const Newjob:JobPost= {
          ...payload,
          jobId: uuidv4(),
          recruiterId: ic.caller(),
          createdAt: getCurrentDate(),
          updatedAt: getCurrentDate(),
          status: "Open",
          applicants: [],
        }
        JobPostStorage.insert(Newjob.jobId, Newjob);
        const Jobs = JobPostStorage.values();
        
        return Ok(Jobs)
    }catch(error:any){
      return Err({Error: `Error Occured ${error}`})
    }
  }),


  updateJob:update([JobPostPayload,text], Result(Vec(JobPost),Message),(payload,id)=>{
    try{

       const jobPostOpt = JobPostStorage.get(id)
       if(!jobPostOpt){
           return Err({NotFound: `Job doesn't exist`})
       }
       const updateJob ={
        ...jobPostOpt,
        ...payload,
        updatedAt: getCurrentDate(),
       }
       JobPostStorage.insert(id,updateJob);
       const Jobs = JobPostStorage.values();
       return Ok(Jobs)
    }catch(error:any){
      return Err({Error: `Error Occured ${error}`})
    }
      
  }),
  deleteJob: update([text],Result(text,Message),(id)=>{

  try{
    const jobPostOpt = JobPostStorage.get(id)
   
    if(!jobPostOpt){
        return Err({NotFound: `Job post does not exist`})
    }
    

    if(jobPostOpt.applicants.length != 0){
     const Allapplication = ApplicationStorage.values();
     const JobApplicantsIds = Allapplication.filter((item)=>item.jobId == jobPostOpt.jobId)
     .map((item)=>item.applicationId);
     for(let i=0; i<JobApplicantsIds.length;i++){
      ApplicationStorage.remove(JobApplicantsIds[i])
     }
    }
    JobPostStorage.remove(id);
    return Ok("Deleted successfully")

  }catch(error:any){
    return Err({Error: `Error Occured ${error}`})
  }
  }),
  getMyJobs: query([],Result(Vec(JobPost),Message),()=>{
    try{
      const jobs = JobPostStorage.values();
      if(jobs.length === 0){
        return Err({Error: "Empty Job Post"})
      }
       const myJobs = jobs.filter((item:JobPost)=>( JSON.stringify(item.recruiterId) == JSON.stringify(ic.caller())));
       if(myJobs.length === 0){
        return Err({Error: "You have not posted a job"})
      }
       return Ok(myJobs);
    }catch(error:any){
      return Err({Error: `Error Occured ${error.message}`})
    }
  }),
  getJobStats:query([],Result(JobStat,Message),()=>{
    try{
      const jobs = JobPostStorage.values();
      if(jobs.length === 0){
        return Err({Error: "Empty Job Post"})
      }
      const myJobs = jobs.filter((item:JobPost)=>( JSON.stringify(item.recruiterId) == JSON.stringify(ic.caller())));
      if(myJobs.length === 0){
       return Err({Error: "You have not posted a job"})
     }
     const Jobstats = getJobStatistics(myJobs);
     return Ok(Jobstats)

    }catch(error:any){
      return Err({Error: `Error Occured ${error.message}`})
    }
  }),
  getAllJobs: query([],Result(Vec(JobPost),Message),async()=>{
    try{
       const job= JobPostStorage.values();
      if(job.length === 0){
        return Err({Error: "Empty Job Post"})
      }
      
      return Ok(job)
    }catch(error:any){
      return Err({Error: `Error Occured ${error}`})
    }
  
  }),
  
  getOneJob: query([text],Result(JobPost,Message),(id)=>{
    try{
      const jobPostOpt = JobPostStorage.get(id)
      if(!jobPostOpt){
          return Err({NotFound: `Job does not exist`})
      }
     
      return Ok(jobPostOpt)
    }catch(error:any){
      return Err({Error: `Error Occured ${error}`})
    }
  }),

   //----------- APPLICATION ---------- 
   applyToJob: update([ApplicationPayload,text],Result(text,Message),(payload, id)=>{
    try{
      const jobPostOpt = JobPostStorage.get(id)
      if(!jobPostOpt){
          return Err({NotFound: `This job does not exist`})
      };
      const NewApplication = {
        ...payload,
        applicationId: uuidv4(),
        jobId: jobPostOpt.jobId,
        status: "Pending",
        submittedAt: getCurrentDate(),
        updatedAt: getCurrentDate()

      };
      ApplicationStorage.insert(NewApplication.applicationId,NewApplication);
      jobPostOpt.applicants.push(NewApplication.applicationId);
      JobPostStorage.insert(jobPostOpt.jobId,jobPostOpt);
      
      return Ok("submitted successfully")
    }catch(error:any){
      return Err({Error: `Error Occured ${error}`})
    }
   }),

   getJobApplicants: query([text],Result(Vec(Application),Message),(jobId)=>{
  
    try{
      const jobPostOpt = JobPostStorage.get(jobId);
      if(!jobPostOpt){
          return Err({NotFound: `Job post with does not exist`})
      };
      if(JSON.stringify(jobPostOpt.recruiterId) !== JSON.stringify(ic.caller())){
        return Err({NotAllowed: "You are not authorized"})
      }
      if(jobPostOpt.applicants.length === 0){
        return Err({Error:"No one apply to this job"})
      }
      const Application = ApplicationStorage.values();
      const JobApplicants  = Application.filter((item)=>item.jobId === jobPostOpt.jobId)
      return Ok(JobApplicants)
    }catch(error:any){
      return Err({Error: `Error Occured ${error.message}`})
    }
   }),
   updateApplication: update([text,text],Result(text,Message),(status,applicationId)=>{
      try{
         const applicationOpt = ApplicationStorage.get(applicationId)
         if(!applicationOpt){
          return Err({Error: "The Application does not exist"})
         }
         const jobOpt = JobPostStorage.get(applicationOpt.jobId);
         if(!jobOpt){
          return Err({NotFound:"Application has invalid job"})
         }

         if(!(JSON.stringify(jobOpt.recruiterId) === JSON.stringify(ic.caller()))){
          return Err({NotAllowed: "You aren't Authorized"})
         }
         const updatedApplication = {
          ...applicationOpt,
          status
         }
         ApplicationStorage.insert(applicationId,updatedApplication);
         return Ok("Updated successfully")
      }catch(error:any){
        return Err({Error: `Error Occured ${error}`})
      }
   }),
});

  
const getCurrentDate = () => {
  const timestamp = new Number(ic.time());
  const date = new Date(timestamp.valueOf() / 1_000_000); // Convert from nanoseconds to milliseconds
  return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
};


function getJobStatistics(jobPosts:any) {
  // Initialize counters
  let totalJobs = jobPosts.length;
  let openJobs = 0;
  let closedJobs = 0;
  let industrySet = new Set();

  // Loop through each job post and gather statistics
  jobPosts.forEach((job:any) => {
    // Count open and closed jobs based on status
    if (job.status === 'open') {
      openJobs++;
    } else if (job.status === 'closed') {
      closedJobs++;
    }

    // Add industry to the set (set automatically handles uniqueness)
    industrySet.add(job.industry);
  });

  // Return the statistics as an object
  return {
    totalJobs: totalJobs,
    openJobs: openJobs,
    closedJobs: closedJobs,
    totalIndustries: industrySet.size
  };
}


