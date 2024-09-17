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
    bool,
    Canister,
    init,
    Void,
    nat,
    // Duration
  } from "azle/experimental";
  import { v4 as uuidv4 } from "uuid";

//   const employmentEnum = Variant({
//     fullTime: text,
//     partTime: text,
//     contract: text,

//   });
//   const jobStatus = Variant({
//     open: text,
//     closed: text,
//   });
//   type jobStatus = typeof jobStatus.tsType
//   const Category = Variant({
//     SoftwareDeveloper: text,
//     Designer: text,
//     photographer: text,
//   });
//   type Category = typeof Category.tsType

//   const requireProps = Record({
//     skill: Vec(text),
//     educationLevel:text,
//     experience: nat64
//   })
//   const salaryRangeProps =Record({
// })
//   // const JobPost = Record({
//   //   jobId: text,
//   //   recruiterId: Principal,
//   //   company:text,
//   //   jobTitle: text,
//   //   jobDescription: text,
//   //   requirements:requireProps,
//   //   salaryRange: salaryRangeProps,
//   //   employmentType: employmentEnum,
//   //   createdAt: Duration,
//   //   updatedAt: Duration,
//   //   status:jobStatus,
//   //   applicants: Vec(text),
//   //   industry: Category 
//   // });
//   // type  JobPost = typeof JobPost.tsType

//   const JobPostPayload = Record({
//     company:text,
//     jobTitle: text,
//     jobDescription: text,
//     requirements:requireProps,
//     salaryRange: salaryRangeProps,
//     employmentType: employmentEnum,
//     industry: Category 
//   });
//   type  JobPostPayload = typeof JobPostPayload.tsType

//   const genderEnum = Variant({
//     male:text,
//     female:text,
//     hide: text
//   });
//   type  genderEnum= typeof genderEnum.tsType
  
//   const academicEnum = Variant({
//     highSchool:text,
//     bachelors: text,
//     masters: text,
//     phd: text
//   });
//   type academicEnum = typeof academicEnum.tsType
//   const applicationStatus =Variant({
//     pending: text,
//     interviewed:text,
//     rejected: text,
//     hired: text
//   });
//   type applicationStatus = typeof applicationStatus.tsType
//   // const Application = Record({
//   //   applicationId: text,
//   //   jobId: text,
//   //   firstName: text,
//   //   secondName: text,
//   //   email:text,
//   //   gender: genderEnum,
//   //   country: text,
//   //   resume_url: text,
//   //   education: academicEnum,
//   //   skill: Vec(text),
//   //   experience: nat64,
//   //   coverLetter: text,
//   //   status: applicationStatus,
//   //   submittedAt: Duration,
//   //   updatedAt: Duration
//   // });
//   type Application = typeof Application.tsType
//   const ApplicationPayload = Record({
//     firstName: text,
//     secondName: text,
//     email:text,
//     gender: genderEnum,
//     country: text,
//     resume_url: text,
//     education: academicEnum,
//     skill: Vec(text),
//     experience: nat64,
//     coverLetter: text,
//   });
//   type ApplicationPayload = typeof ApplicationPayload.tsType

//   const Message = Variant({
//     NotFound: text,
//     Success: text,
//     Error: text,
//     NotAllowed:text
//   });
  
//   type Message = typeof Message.tsType

//  const JobPostStorage = StableBTreeMap<text,JobPost>(0);
//  const ApplicationStorage  = StableBTreeMap<text,Application>(1)
  
    export default Canister({
        getMessage:query([],text,()=>{
          return "hello world"
        })
      //-----------JOB POSTING---------- 
    // createJob: update([JobPostPayload],Result(Vec(JobPost),Message),(payload)=>{
    //   try{
           
    //       const Newjob:JobPost= {
    //         ...payload,
    //         jobId: uuidv4(),
    //         recruiterId: ic.caller(),
    //         createdAt: getCurrentDate(),
    //         updatedAt: getCurrentDate(),
    //         status:{open:"OPEN"},
    //         applicants: [],
    //       }
    //       JobPostStorage.insert(Newjob.jobId, Newjob);
    //       const Jobs = JobPostStorage.values();
    //       return Ok(Jobs)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }

    // }),
  

    // updateJob:update([JobPostPayload,text], Result(Vec(JobPost),Message),(payload,id)=>{
    //   try{
    //      const jobPostOpt = JobPostStorage.get(id)
    //      if(!jobPostOpt){
    //          return Err({NotFound: `Job post with id=${id} does not exist`})
    //      }
    //      const updateJob ={
    //       ...jobPostOpt,
    //       ...payload,
    //       updatedAt: getCurrentDate(),
    //      }
    //      JobPostStorage.insert(id,updateJob);
    //      const Jobs = JobPostStorage.values();
    //      return Ok(Jobs)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
        
    // }),
    // deleteJob: update([text],Result(text,Message),(id)=>{

    // try{
    //   const jobPostOpt = JobPostStorage.get(id)
    //   if(!jobPostOpt){
    //       return Err({NotFound: `Job post with id=${id} does not exist`})
    //   }
    //   JobPostStorage.remove(id);

    //   return Ok("Deleted successfully")

    // }catch(error:any){
    //   return Err({Error: `Error Occured ${error}`})
    // }
    // }),
    // getMyJobs: query([],Result(Vec(JobPost),Message),()=>{
    //   try{
    //     const jobs = JobPostStorage.values();
    //     if(jobs.length === 0){
    //       return Err({Error: "Empty Job Post"})
    //     }
    //      const myJobs = jobs.filter((item:JobPost)=> item.recruiterId === ic.caller());
    //      if(myJobs.length === 0){
    //       return Err({Error: "You have not posted a job"})
    //     }
    //      return Ok(myJobs);
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    // }),
    // getAllJobs: query([],Result(Vec(JobPost),Message),()=>{
    //   try{
    //     const jobs = JobPostStorage.values();
    //     if(jobs.length === 0){
    //       return Err({Error: "Empty Job Post"})
    //     }
    //     return Ok(jobs)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    
    // }),
    // getJobByCategory:query([text],Result(Vec(JobPost),Message),(category)=>{
    //   try{
    //     const jobs = JobPostStorage.values();
    //     if(jobs.length === 0){
    //       return Err({Error: "Empty Job Post"})
    //     }
    //      const myJobs = jobs.filter((item:JobPost)=> item.industry.toString() == category);
    //      if(myJobs.length=== 0){
    //       return Err({Error: `Not job post for this category=${category}`})
    //     }
    //      return Ok(myJobs);
       
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    // }),

    // getOneJob: query([text],Result(JobPost,Message),(id)=>{
    //   try{
    //     const jobPostOpt = JobPostStorage.get(id)
    //     if(!jobPostOpt){
    //         return Err({NotFound: `Job post with id=${id} does not exist`})
    //     }
    //     return Ok(jobPostOpt)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    // }),

    //  //----------- APPLICATION ---------- 
    //  applyToJob: update([ApplicationPayload,text],Result(text,Message),(payload, id)=>{
    //   try{
    //     const jobPostOpt = JobPostStorage.get(id)
    //     if(!jobPostOpt){
    //         return Err({NotFound: `Job post with id=${id} does not exist`})
    //     };
    //     const NewApplication = {
    //       ...payload,
    //       applicationId: uuidv4(),
    //       jobId: jobPostOpt.jobId,
    //       status: {pending:"Pending"},
    //       submittedAt: getCurrentDate(),
    //       updatedAt: getCurrentDate()

    //     };
    //     ApplicationStorage.insert(NewApplication.applicationId,NewApplication);
    //     jobPostOpt.applicants.push(NewApplication.applicationId);
    //     JobPostStorage.insert(jobPostOpt.jobId,jobPostOpt);
        
    //     return Ok("Application submitted successfully")
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    //  }),

    //  getJobApplicants: query([text],Result(Vec(Application),Message),(jobId)=>{
    //   try{
    //     const jobPostOpt = JobPostStorage.get(jobId);
    //     if(!jobPostOpt){
    //         return Err({NotFound: `Job post with id=${jobId} does not exist`})
    //     };
    //     if(jobPostOpt.recruiterId !== ic.caller()){
    //       return Err({NotAllowed: "You cannot access the applicants of this job"})
    //     }
    //     if(jobPostOpt.applicants.length === 0){
    //       return Err({Error:"Not one apply to this job"})
    //     }
    //     return Ok(jobPostOpt.applicants)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    //  }),
    //  updateApplication: update([applicationStatus,text],Result(text,Message),(status,applicationId)=>{
    //     try{
    //        const applicationOpt = ApplicationStorage.get(applicationId)
    //        if(!applicationOpt){
    //         return Err({Error: "The Application does not exist"})
    //        }
    //        const jobOpt = JobPostStorage.get(applicationOpt.jobId);
    //        if(!jobOpt){
    //         return Err({NotFound:"We are enable to find the job of this application"})
    //        }

    //        if(!(jobOpt.recruiterId === ic.caller())){
    //         return Err({NotAllowed: "You can not update this application"})
    //        }
    //        const updatedApplication = {
    //         ...applicationOpt,
    //         status
    //        }
    //        ApplicationStorage.insert(applicationId,updatedApplication);
    //        return Ok("Updated successfully")
    //     }catch(error:any){
    //       return Err({Error: `Error Occured ${error}`})
    //     }
    //  }),
    //  getApplicantsByStatus: query([text,applicationStatus],Result(Vec(Application),Message),(jobId,status)=>{
    //   try{
    //     const jobPostOpt = JobPostStorage.get(jobId);
    //     if(!jobPostOpt){
    //         return Err({NotFound: `Job post with id=${jobId} does not exist`})
    //     };
    //     if(jobPostOpt.recruiterId !== ic.caller()){
    //       return Err({NotAllowed: "You cannot access the applicants of this job"})
    //     }
    //     const applicationByCategory = jobPostOpt.applicants.filter((item)=>item.status.toString() === status);
    //     if(applicationByCategory.length === 0){
    //       return Err({Error:"Not application with this status"})
    //     }
    //     return Ok(jobPostOpt.applicants)
    //   }catch(error:any){
    //     return Err({Error: `Error Occured ${error}`})
    //   }
    //  }),

  });

    
  const getCurrentDate=()=>{
    const timestamp = new Number(ic.time());
    return new Date(timestamp.valueOf() / 1000_000);
}