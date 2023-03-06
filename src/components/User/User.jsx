import styles from "./User.module.css"
import icon from "./images/edit-icon.png"
import { useOutletContext } from "react-router-dom"
import { ListOfUserAddProducts } from "./ListOfUserAddProducts"
import { useUser } from "../../hooks/useUser"
import { Loader } from "../Loader/Loader"
import { useDispatch } from "react-redux"
import { openAddNewProductPopup } from "../redux/slices/mutateProductSlice"

export const User = (props) => {
  const dispatch = useDispatch()

  // const { openAddNewProductPopup } = useOutletContext()
  const userQuery = useUser()

  const onEditAvatar = () => {
    console.log(1)

    // const openPopup() {

    // }
  }

  function UserInfo() {
    if (userQuery.isLoading) return <Loader />
    if (userQuery.isError) return <p>Ошибка загрузки данных о пользователе</p>

    const user = userQuery.data

    return (
      <>
        <div className={styles.profile__avatar} onClick={onEditAvatar}>
          <img
            className={styles.profile__avatar_image}
            src={user.avatar}
            alt='Аватар'
          />
          <div className={styles.profile__avatar_overlay}>
            <img alt='иконка' src={icon} />
          </div>
        </div>
        <div>
          <h1 className={styles.profile__title}>{user.name}</h1>
          <p>{user.about}</p>
        </div>
        <div>
          <p className={styles.profile__title}>{user.group}</p>
          <p>{user.email}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <UserInfo />
      </div>
      <h2>Список моих продуктов</h2>
      <div className={styles.user_footer}>
        <button
          className={styles.button_big}
          onClick={() => dispatch(openAddNewProductPopup())}
        >
          Добавить продукт
        </button>
      </div>
      <ListOfUserAddProducts />
    </>
  )
}
