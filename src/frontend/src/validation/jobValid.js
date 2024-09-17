import * as Yup from "yup";

export const JobValid = Yup.object().shape({
    company: Yup
    .string()
    .required()
    .min(3, "Username must atleat 6 character"),

    jobTitle: Yup
    .string()
    .required()
    .min(3, "minimun required is 6")
    .max(30,"miximun required is 30"),

    education: Yup
    .string()
    .required(),
    
    experience: Yup
    .string()
    .required(),

    employementType: Yup
    .string()
    .required(),

    industry: Yup
    .string()
    .required(),
    tags: Yup.array().min(1, 'At least one tag must be selected')
});