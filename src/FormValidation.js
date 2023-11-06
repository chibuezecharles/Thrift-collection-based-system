import * as Yup from 'yup';


export const registrationForm = Yup.object({
    fullName: Yup.string().required('Enter your full name'),
    email: Yup.string().email('Invalid email address').required('Enter your email address'),
    password: Yup.string().required('Enter your password'),
    role: Yup.string().oneOf(['user', 'admin'], 'Select a valid role').required('Select a role'),
});


export const loginForm = Yup.object({
    email: Yup.string().email('Invalid email address').required('Enter your email address'),
    password: Yup.string().required('Enter your password'),
});