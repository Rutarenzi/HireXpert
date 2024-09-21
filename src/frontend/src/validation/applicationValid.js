import * as Yup from "yup";

export const ApplicationValid = Yup.object().shape({
    firstname: Yup
    .string()
    .required('First name is required')
    .min(3, "First name must atleat 6 character")
    .max(15, "First name must be less than 7"),

    secondname: Yup
    .string()
    .required("Second name is required")
    .min(3, "minimun required is 6")
    .max(30,"miximun required is 30"),

    email: Yup.string().email('Invalid email format').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    education: Yup.string().required('Education level is required'),
    experience: Yup.number().required('Experience is required').min(1,"Experience must be 1+").max(40,"Experience must be -40"),
    coverletter: Yup.string().required("Cover letter is required").min(50,"min words are 50"),
    skills: Yup.array().min(1, 'At least one tag must be selected')
});