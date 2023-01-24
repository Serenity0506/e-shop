import { createSigninValidationSchema } from './validator_up';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../global_styles/form.css';
import '../global_styles/form_error.css';
import '../global_styles/form_input.css';
import '../global_styles/form_button-reg.css';
import '../global_styles/form_button.css';
import '../global_styles/form_text.css';

import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../Api/Api/DogFoodApi';
import { useMutation } from '@tanstack/react-query';


const initialValue = {
    email: '',
    group: '',
    password: '',
}


export function SignUp() {
    const navigate = useNavigate()
  
    const { mutateAsync, isLoading } = useMutation({
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
            <Form className='form'>
                <Field className='form_input' name="email" type="email" placeholder='email here' />
                <ErrorMessage className='form_error' name="email" />

                <Field className='form_input'  name="group" type="text" placeholder='sm9' />
                <ErrorMessage className='form_error' name="group" />   
                
                <Field className='form_input'  name="password" type="password" placeholder='password here' />
                <ErrorMessage className='form_error' name="password" />   

                <button className='form_button' type='submit'>Регистрация</button>      
            </Form>
            )}
            </Formik>
        </>
    )
}