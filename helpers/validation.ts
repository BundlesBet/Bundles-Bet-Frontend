import * as yup from 'yup'

export const signUpValidation = yup.object({
  email: yup
    .string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      message: 'Enter valid email address',
    })
    .typeError('Enter valid email address'),
  userName: yup
    .string()
    .typeError('User Name is required')
    .required('User Name is required'),
})
