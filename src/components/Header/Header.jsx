import styles from "./Header.module.css"

import logo from "./images/logo.png"
import heart from "./images/heart.png"
import user from "./images/user.png"
import logout from "./images/logout.png"
import bone from "./images/bone.png"

import briefcase from "./images/briefcase.png"
import { Link, useNavigate } from "react-router-dom"
import { getTokenSelector } from "../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, getCartSelector } from "../redux/slices/cartSlice"
import { logOut } from "../redux/slices/userSlice"
import { Search } from "../Search/Search"
import { clearFavorites } from "../redux/slices/favoritesSlice"

export const Header = () => {
  //вытаскиваем из редакса токен и корзину
  const token = useSelector(getTokenSelector)
  const cart = useSelector(getCartSelector)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  function handleLogOut() {
    dispatch(logOut())
    dispatch(clearCart())
    dispatch(clearFavorites())
    navigate("/")
  }

  const MenuBar = () => {
    if (!token) {
      return (
        <Link to='/signin'>
          <button className={styles.header_button}>
            <img className={styles.header_logo} src={user} alt='user' />
          </button>
        </Link>
      )
    }

    return (
      <>
        <Link to='/products'>
          <button className={styles.header_button}>
            <img className={styles.header_logo} src={bone} alt='like' />
          </button>
        </Link>
        <Link to='/favorites'>
          <button className={styles.header_button}>
            <img className={styles.header_logo} src={heart} alt='like' />
          </button>
        </Link>
        <Link className={styles.header_cart_wrapper} to='/cart'>
          <button className={styles.header_button}>
            <img className={styles.header_logo} src={briefcase} alt='Cart' />
          </button>
          {cart.length ? (
            <div className={styles.header_cartCount}>{cart.length}</div>
          ) : null}
        </Link>
        <Link to='/user'>
          <button className={styles.header_button}>
            <img className={styles.header_logo} src={user} alt='user' />
          </button>
        </Link>

        <Link onClick={handleLogOut}>
          <button className={styles.header_button}>
            <img className={styles.logout_logo} src={logout} alt='logout' />
          </button>
        </Link>
      </>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <Link to='/'>
          <img className={styles.header_logo} src={logo} alt='logo' />
        </Link>
        <h1 className={styles.header_title}>DogFood</h1>
      </div>
      <Search />

      <div className={styles.header_left}>
        <MenuBar />
      </div>
    </div>
  )
}
