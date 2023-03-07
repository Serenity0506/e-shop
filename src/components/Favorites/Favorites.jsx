import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { GridOfProducts } from "../GridOfProducts/GridOfProducts"
import { Loader } from "../Loader/Loader"
import { getCartSelector } from "../redux/slices/cartSlice"
import { getFavoritesSelector } from "../redux/slices/favoritesSlice"
import { getTokenSelector } from "../redux/slices/userSlice"
import styles from "./Favorites.module.css"

export const Favorites = () => {
  const favorites = useSelector(getFavoritesSelector)
  const cart = useSelector(getCartSelector)
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line
  }, [token])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favoritesfetch", favorites],
    queryFn: () => dogFoodApi.getProductsByIds(favorites.map((f) => f._id)),
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  if (!data?.length) {
    return (
      <>
        <div className={styles.cart_empty}>
          <span>Ни одна кругля не запала в сердечко</span>
          <Loader></Loader>
          <NavLink to='/products'>
            <button className={styles.button1}>За покупками!</button>
          </NavLink>
        </div>
      </>
    )
  }

  const dataWithId = data.map((p) => ({
    id: p._id,
    inCart: cart.some((cp) => cp._id === p._id),
    ...p,
  }))

  return (
    <div className={styles.fav}>
      {dataWithId.length ? (
        <GridOfProducts products={dataWithId} />
      ) : (
        <p>Любимых продуктов нет :(</p>
      )}
    </div>
  )
}

//объявляем переменную favorites из редакса
//вызываем с сервера метод апи, в который передаем массив идентияифкаторов продуктов
//в ответ получаем массив с полными карточками этих продуктов
//записываем его в дата
//проходимся мэп по дата, возвращаем массив хтмл разметки
