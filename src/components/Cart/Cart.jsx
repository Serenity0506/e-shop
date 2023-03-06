import {
  checkAllP,
  getCartSelector,
  uncheckAllP,
} from "../redux/slices/cartSlice"
import { getTokenSelector } from "../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getQueryCartKey } from "../utils/utils"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { Loader } from "../Loader/Loader"
import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem/Cartitem"
import styles from "./Cart.module.css"

export function Cart() {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const cart = useSelector(getCartSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line
  }, [token])

  const productIds = cart.map((product) => product._id)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [getQueryCartKey(productIds)],
    queryFn: () => dogFoodApi.getProductsByIds(productIds),
    enabled: !!token,
    keepPreviousData: true,
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  if (!data?.length) {
    return (
      <>
        <div className={styles.cart_empty}>
          <span>Корзина пуста</span>
          <Loader></Loader>
          <NavLink to='/products'>
            <button className={styles.button}>За покупками!</button>
          </NavLink>
        </div>
      </>
    )
  }

  const preparedData = cart
    .filter((p) => !p.err)
    .map((p) => ({
      ...p,
      ...data.find((i) => i._id === p._id),
    }))
    .map((p) => ({
      ...p,
      priceWithDicsount: p.price - (p.discount / 100) * p.price,
      discount: p.discount,
      priceFinal: p.count * (p.price - (p.discount / 100) * p.price),
    }))

  const totalPrice = preparedData.reduce((sum, product) => {
    if (product.isChecked) {
      sum += product.priceFinal
    }
    return sum
  }, 0)

  let isAllChecked =
    cart.length && cart.reduce((res, p) => res && p.isChecked, true)

  const checkAllHandler = (e) => {
    if (e.target.checked) {
      dispatch(checkAllP())
    } else {
      dispatch(uncheckAllP())
    }
  }

  return (
    <>
      <div className={styles.cart_header}>
        <div className={styles.item_checkbox}>
          <input
            type='checkbox'
            checked={isAllChecked}
            onChange={checkAllHandler}
          ></input>
        </div>
        <div className={styles.item_header}>Выбрать все товары</div>
      </div>
      <ul>
        {preparedData.map((p) => (
          <CartItem key={p._id} product={p} />
        ))}
      </ul>
      <div className={styles.cart_footer}>
        <button
          type='button'
          className={`${styles.button} ${
            !cart.some((p) => p.isChecked) ? styles.button_disabled : ""
          }`}
        >
          Оплатить
        </button>
        {totalPrice}₽
      </div>
    </>
  )
}
