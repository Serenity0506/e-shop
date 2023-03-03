import styles from "./User.module.css"
import icon from "./images/edit-icon.png"
// import { Loader } from "../Loader/Loader"

export const User = (props) => {
  const onEditAvatar = () => {
    console.log(1)

    // const openPopup() {

    // }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile__avatar} onClick={onEditAvatar}>
          <img
            className={styles.profile__avatar_image}
            // src={currentUser?.avatar}
            alt='Аватар'
          />
          <div className={styles.profile__avatar_overlay}>
            <img alt='иконка' src={icon} />
          </div>
        </div>
        <div>
          <h1 className={styles.profile__title}>name</h1>
          <p>job</p>
        </div>
        <div>
          <p className={styles.profile__title}>group</p>
          <p>email</p>
        </div>
      </div>
      <div className={styles.user_footer}>
        <button
          className={styles.button_big}
          onClick={props.onAddProductPopupOpen}
        >
          Добавить продукт
        </button>
        <button
          className={styles.button_big}
          onCLick={props.onListOfUserAddProducts}
        >
          Список добавленных
        </button>
      </div>
    </>
  )
}

// <p>{user.name}</p>
// <p>job</p>
// <p>{user.group}</p>
// <p>{user.email}</p>
// {currentUser?.name}
