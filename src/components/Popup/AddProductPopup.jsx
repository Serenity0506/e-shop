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

  const initialValues = {
    pictures:
      "https://avatars.mds.yandex.net/i?id=754692ec6c8aa9d57aceef81c3014916abf5a2ee-9311909-images-thumbs&n=13",
    price: "1000",
    wight: "1",
    name: "драгонфрут",
    discount: 10,
    stock: 3,
    description: "Тестовое описание",
  }

  return (
    <dialog ref={dialogRef} onClose={handlePopupClose}>
      <h1>{isEdit ? "Редактирование товара" : "Добавление нового товара"}</h1>
      <Formik
        initialValues={{ ...product }}
        enableReinitialize={true}
        validationSchema={createSigninValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {(props) => (
          <Form className={`${styles.form}`} onSubmit={props.handleSubmit}>
            <Field
              className={styles.form_input}
              name='pictures'
              type='url'
              placeholder='ссылка на картинку'
            />
            <ErrorMessage className={styles.form_error} name='pictures' />

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

            <Field
              className={styles.form_input}
              name='discount'
              type='number'
              placeholder='скидка'
            />
            <ErrorMessage className={styles.form_error} name='discount' />

            <Field
              className={styles.form_input}
              name='stock'
              type='number'
              placeholder='количество'
            />
            <ErrorMessage className={styles.form_error} name='stock' />

            <Field
              className={styles.form_input}
              name='description'
              type='text'
              placeholder='краткое описание'
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
