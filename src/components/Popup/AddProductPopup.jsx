import { Formik, Form, Field, ErrorMessage } from "formik"
import { createSigninValidationSchema } from "./validator_popup"
import styles from "./Popup.module.css"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  closeProductPopup,
  getMutatePopupStateSelector,
  getProductFromMutatePopupSelector,
} from "../redux/slices/mutateProductSlice"

export const AddProductPopup = ({ onProductMutate }) => {
  const dispatch = useDispatch()
  const dialogRef = useRef(null)
  const { isOpen, isEdit } = useSelector(getMutatePopupStateSelector)
  const product = useSelector(getProductFromMutatePopupSelector)

  useEffect(() => {
    if (isOpen) {
      !dialogRef.current.open && dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  const handlePopupClose = (e) => {
    dispatch(closeProductPopup())
  }

  const handleFormSubmit = (values, actions) => {
    dispatch(closeProductPopup())
    actions.resetForm()
    onProductMutate(values)
  }

  const initialValue = {
    pictures: "",
    price: "",
    wight: "",
    name: "",
    discount: "",
    stock: "",
    description: "",
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handlePopupClose}
      className={styles.dialog}
    >
      <h1>{isEdit ? "Редактирование товара" : "Добавление нового товара"}</h1>
      <Formik
        initialValues={{ ...product }}
        // initialValues={initialValue}
        enableReinitialize={true}
        validationSchema={createSigninValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {(props) => (
          <Form className={`${styles.form}`} onSubmit={props.handleSubmit}>
            <label htmlFor='pictures' className={styles.header}>
              Cсылка на картинку:
            </label>
            <Field
              className={styles.form_input}
              name='pictures'
              type='url'
              placeholder='вставьте ссылку'
            />
            <ErrorMessage className={styles.form_error} name='pictures' />

            <label htmlFor='price' className={styles.header}>
              Цена товара:
            </label>
            <Field
              className={styles.form_input}
              name='price'
              type='number'
              placeholder='введите цену'
            />
            <ErrorMessage className={styles.form_error} name='price' />

            <label htmlFor='wight' className={styles.header}>
              Вес товара:
            </label>
            <Field
              className={styles.form_input}
              name='wight'
              id='wight'
              type='text'
              placeholder='Задайте вес'
              label='вес'
            />
            <ErrorMessage className={styles.form_error} name='wight' />

            <label htmlFor='name' className={styles.header}>
              Название продукта:
            </label>
            <Field
              className={styles.form_input}
              name='name'
              type='text'
              placeholder='Введите название продукта'
            />
            <ErrorMessage className={styles.form_error} name='name' />

            <label htmlFor='discount' className={styles.header}>
              Скидка на товар:
            </label>
            <Field
              className={styles.form_input}
              name='discount'
              type='number'
              placeholder='Введите скидку'
              label='скидка'
            />
            <ErrorMessage className={styles.form_error} name='discount' />

            <label htmlFor='stock' className={styles.header}>
              Количество:
            </label>
            <Field
              className={styles.form_input}
              name='stock'
              type='number'
              placeholder='Введите количество товаров'
            />
            <ErrorMessage className={styles.form_error} name='stock' />

            <label htmlFor='description' className={styles.header}>
              Описание товара:
            </label>
            <Field
              className={styles.form_input}
              name='description'
              type='text'
              placeholder='Введите краткое описание товара'
            />
            <ErrorMessage className={styles.form_error} name='description' />

            <button className={styles.form_button} type='submit'>
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </dialog>
  )
}
