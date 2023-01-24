// import { Formik, Form, Field, ErrorMessage} from 'formic';
import { createSigninValidationSchema } from './validator_in';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../global_styles/form.css';
import '../global_styles/form_error.css';
import '../global_styles/form_input.css';
import '../global_styles/form_button-reg.css';
import '../global_styles/form_button.css';
import '../global_styles/form_text.css';

import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { dogFoodApi } from '../Api/Api/DogFoodApi';



const initialValue = {
    email: '',
    // group: '',
    password: '',
}

export function SignIn() {
    const navigate = useNavigate()
  
    const { mutateAsync } = useMutation({
      mutationFn: (data) => dogFoodApi.signIn(data)})

      const submitHandler = async (values) => {
        const response = await mutateAsync(values)
        const { data: resData, token } = response
        console.log({ resData }, { token })
        navigate('/')
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

// const SighinWithQuery = withQuery()
// function SignIn() {
//     const { token, setToken } = useContext(AppContext)

//     const { mutateAsync, isError, error,} = useMutation({
//         mutation
//     }) }
// }

// export const Signin1 = () => {

//     return<h1 className='footer_link'>Sighin</h1>
// }