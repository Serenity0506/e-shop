import { createSigninValidationSchema } from './validator_up';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../global_styles/form.css';
import '../global_styles/form_error.css';
import '../global_styles/form_input.css';
import '../global_styles/form_button-reg.css';
import '../global_styles/form_button.css';
import '../global_styles/form_text.css';

import { Link } from 'react-router-dom';


const initialValue = {
    email: '',
    group: '',
    password: '',
}


export const Signup = () => {

    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={createSigninValidationSchema}
                onSubmit={(values) => {
                    console.log(values)
            }}
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