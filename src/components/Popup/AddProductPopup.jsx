import { Formik, Form, Field, ErrorMessage } from "formik"
import { createSigninValidationSchema } from "./validator_popup"
import styles from "./Popup.module.css"

export const AddProductPopup = ({ isOpen, onClose }) => {
  // const initialValue = {
  //   price: "",
  //   wight: "",
  //   name: "",
  // }
  return (
    <>
      <Formik
        // {/* initialValues={initialValue} */}
        validationSchema={createSigninValidationSchema}
      >
        {() => (
          <Form className={`${styles.form} ${isOpen ? styles.form_open : ""}`}>
            <Field
              className={styles.form_input}
              name='url'
              type='url'
              placeholder='ссылка на картинку'
            />
            <Field
              className={styles.form_input}
              name='price'
              type='number'
              placeholder='цена'
            />
            <ErrorMessage className={styles.form_error} name='price' />

            <Field
              className={styles.form_input}
              name='wight'
              type='text'
              placeholder='вес'
            />
            <ErrorMessage className={styles.form_error} name='wight' />

            <Field
              className={styles.form_input}
              name='name'
              type='text'
              placeholder='название продукта'
            />
            <ErrorMessage className={styles.form_error} name='name' />

            <button className={styles.form_button} type='submit'>
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
