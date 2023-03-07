// import { Formik, Form, Field, ErrorMessage} from 'formic';
import { createSigninValidationSchema } from "./validator_in"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { dogFoodApi } from "../../Api/Api/DogFoodApi"
import { useDispatch } from "react-redux"
import { logIn } from "../../redux/slices/userSlice"

import styles from "../Form.module.css"
import { useState } from "react"

const initialValue = {
  email: "",
  // group: '',
  password: "",
}

export function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [error, setError] = useState("")

  const { mutateAsync } = useMutation({
    mutationFn: (data) => dogFoodApi.signIn(data),
    onError: (e) => setError(e.message),
  })

  const submitHandler = async (values) => {
    setError("")
    const response = await mutateAsync(values)
    const { data: resData, token } = response
    console.log({ resData, token })
    dispatch(logIn(resData._id, token, resData.email))
    setTimeout(() => {
      //обновление состояния в реакте синхронная операция,поэтому сет навгейт сработает после утсановки токена
      navigate("/products")
    })
  }

  return (
    <>
      <span>{error}</span>
      <Formik
        initialValues={initialValue}
        validationSchema={createSigninValidationSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className={styles.form}>
            <Field
              className={styles.form_input}
              name='email'
              type='email'
              placeholder='email here'
            />
            <ErrorMessage className={styles.form_error} name='email' />

            <Field
              className={styles.form_input}
              name='password'
              type='password'
              placeholder='password here'
            />
            <ErrorMessage className={styles.form_error} name='password' />

            <button className={styles.form_button} type='submit'>
              Войти
            </button>

            <p className={styles.form_text}>
              Новый пользователь? Вам сюда &darr;
            </p>
            <Link to='/signup'>
              <button className={styles.form_button_reg} type='submit'>
                Регистрация
              </button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}
