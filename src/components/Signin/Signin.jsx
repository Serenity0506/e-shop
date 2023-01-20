// import { Formik, Form, Field, ErrorMessage} from 'formic';
import { createSigninValidationSchema } from './validator_in';
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
    // group: '',
    password: '',
}


export const Signin = () => {

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
                
                <Field className='form_input'  name="password" type="password" placeholder='password here' />
                <ErrorMessage className='form_error' name="password" />   

                <button className='form_button' type='submit'>Войти</button>    
                
                <p className='form_text'>Новый пользователь? Вам сюда &darr;</p>  
                <Link to='/signup'>
                    <button className='form_button-reg' type='submit'>Регистрация</button>      
                </Link>
            </Form>
            )}
            </Formik>
        </>
    )
}



// export const Signin1 = () => {

//     return<h1 className='footer_link'>Sighin</h1>
// }
