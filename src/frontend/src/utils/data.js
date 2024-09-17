
 export const Applicant = Array.from({ length: 20 }, (_, index) => ({
    applicationId: `${(index* 23429)}`,
    firstName: `Rutx ${index +23}`,
    secondName: `Axcel ${index +23}`,
    email: `Axcel${index +23}@gmail.com`,
    gender: `${(index)/2==0? "Male":"Female"}`,
    country: `Euro ${index *23}`,
    educationLevel: `Bachelors`,
    experience: `${ 5 + index}`,
    skill: ['React','ReactNative','Javascript','Typescript'],
    coverLetter: `Hello! this is the world`,
    status: `${(index%2===0)?'Open':'Close'}`,
    createdAt: `${new Date(2024, 8, 13, 15, 30, 0)}`,
    
  }));

  export const Job = Array.from({ length: 20 }, (_, index) => ({
    jobId: `${(index* 23429)}`,
    recruiterId: `${(index* 202970)}`,
    company: `Rutx hub ${index +23}`,
    jobTitle: `software developer ${index +23}`,
    jobDescription: `description of the job application ${index +230}`,
    requirements: {
      skill: ['React','ReactNative','Javascript','Typescript'],
      educationLevel: `Bachelors`,
      experience: `${ 5 + index}`
    },
    salaryRange: {
      "min": `${index*3400}`,
      "max": `${index*4400}`
  },
    employmentType: "FullTime",
    createdAt: `${new Date(2024, 8, 13, 15, 30, 0)}`,
    updatedAt: `${new Date(2024, 8, 13, 15, 30, 0)}`,
    status: `${(index%2===0)?'Open':'Close'}`,
    applicants: [],
    industry: "Software developer" 
  }));