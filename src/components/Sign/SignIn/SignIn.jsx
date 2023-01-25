// import { Formik, Form, Field, ErrorMessage} from 'formic';
import { createSigninValidationSchema } from './validator_in';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { dogFoodApi } from '../../Api/Api/DogFoodApi';
import { useAppContext } from '../../../Context/AppContextProvider';

import styles from '../Form.module.css';

const initialValue = {
    email: '',
    // group: '',
    password: '',
}

export function SignIn() {
    const navigate = useNavigate()

    const { setToken } = useAppContext()
  
    const { mutateAsync } = useMutation({
      mutationFn: (data) => dogFoodApi.signIn(data)})

      const submitHandler = async (values) => {
        const response = await mutateAsync(values)
        const { data: resData, token } = response
        console.log({ resData, token })
        setToken(token)
        setTimeout(() => { //обновление состояния в реакте синхронная операция,поэтому сет навгейт сработает после утсановки токена
            navigate('/products')
        })
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
                
                <Field className={styles.form_input}  name="password" type="password" placeholder='password here' />
                <ErrorMessage className={styles.form_error} name="password" />   

                <button className={styles.form_button} type='submit'>Войти</button>    
                
                <p className={styles.form_text}>Новый пользователь? Вам сюда &darr;</p>  
                <Link to='/signup'>
                    <button className={styles.form_button_reg} type='submit'>Регистрация</button>      
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