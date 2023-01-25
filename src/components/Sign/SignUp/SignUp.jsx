import { createSigninValidationSchema } from './validator_up';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../Api/Api/DogFoodApi';
import { useMutation } from '@tanstack/react-query';

import styles from '../Form.module.css';


const initialValue = {
    email: '',
    group: '',
    password: '',
}


export function SignUp() {
    const navigate = useNavigate()
  
    const { mutateAsync } = useMutation({
      mutationFn: (data) => dogFoodApi.signUp(data)})


      const submitHandler = async (values) => {
        const response = await mutateAsync(values)
        console.log(response)
    
        navigate('/signin')
      }

    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={createSigninValidationSchema}
                onSubmit={submitHandler}
            >
            {() => (
            <Form className={styles.form}>
                <Field className={styles.form_input} name="email" type="email" placeholder='email here' />
                <ErrorMessage className={styles.form_error} name="email" />

                <Field className={styles.form_input}  name="group" type="text" placeholder='sm9' />
                <ErrorMessage className={styles.form_error} name="group" />   
                
                <Field className={styles.form_input}  name="password" type="password" placeholder='password here' />
                <ErrorMessage className={styles.form_error} name="password" />   

                <button className={styles.form_button} type='submit'>Регистрация</button>      
            </Form>
            )}
            </Formik>
        </>
    )
}