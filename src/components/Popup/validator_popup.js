import * as Yup from "yup"

export const createSigninValidationSchema = Yup.object({
  price: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  wight: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  name: Yup.string()
    .max(10, "Must be 20 characters or less")
    .required("Required"),
})

// group: Yup.string()
// .max(20, 'Must be 20 characters or less')
// .required('Required'),
