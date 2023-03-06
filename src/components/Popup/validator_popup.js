import * as Yup from "yup"

export const createSigninValidationSchema = Yup.object({
  pictures: Yup.string().required("Required"),
  price: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  wight: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  stock: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  discount: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
})

// group: Yup.string()
// .max(20, 'Must be 20 characters or less')
// .required('Required'),
